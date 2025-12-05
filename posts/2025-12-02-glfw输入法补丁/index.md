---
title: "针对Minecraft/glfw退格问题的补丁"
date: "2025-12-02"
description: "给Minecraft实现“正确”的输入法处理逻辑"
category: ["dev"]
tag: ["glfw", "输入法", "minecraft"]
comment: true
layout: post
---

## 背景

今年上半年我写过一篇blog（[glfw输入法问题的临时解决办法](/posts/2025-03-10-glfw输入法问题的临时解决办法/)），吐槽了一下glfw下退格键被输入法和应用程序同时触发两次的问题。由于退格键这个信号同时被传给了输入法和glfw，导致我删除预编辑文本的时候，会把已经输入的文本也删掉，导致输入体验非常糟糕。

最常见的例子就是Minecraft。除了MC之外，所有使用Dear ImGui的程序也都会碰到一模一样的问题。

我本以为这是Linux特有的问题，没想下半年用了mac之后，又碰到了一模一样的问题，于是干脆fork了一下glfw，做了点微小的修改（详见[glfw-ime-fix](https://github.com/fpg2012/glfw-ime-fix)）……

上次的blog更多是在吐槽glfw的错误处理方式和Linux的输入法生态，对于解决方案描述得很简略。这次会尽量详细地说明解决方案。

> 没错，这就是我把同样的主题拿出来再水一遍的原因。

## 解决方案

我fork了glfw 3.4，然后做了几个微小的改动，在预编辑文本的时候把多余的键盘事件过滤掉了。

> 参考[README](https://github.com/fpg2012/glfw-ime-fix)。这里面有更详细的步骤说明。

这里只做概念上的描述。

首先clone下[glfw-ime-fix](https://github.com/fpg2012/glfw-ime-fix)，然后编译出所需的动态链接库：

- 对于Linux：`libglfw.3.4.so`
- 对于MacOS： `libglfw.3.4.dylib`

然后用这个动态链接库去替换Minecraft依赖项中的libglfw。

### 针对Minecraft的问题。

MC是java写的，要调用glfw，需要用到lwjgl。

在lwjgl的jar包里有个libglfw.so或者libglfw.dylib。把这个动态链接库换成我们修改过的glfw，就能解决输入法问题。（另外也要更新一下checksum，否则校验jar包的时候会不通过）

## 问题原因

最核心的原因就在于退格键被触发两次。

一开始，系统告诉glfw：“用户按下了退格键”。glfw同时做了两个处理：

1. 通过`_glfwInputKey`告诉应用：“用户按下了退格键”
2. 通过输入法协议告诉输入法：“用户按下了退格键，你需要删掉预编辑文本”

不管是MC还是Dear ImGui，核心的开发人员都不需要使用比较复杂的输入法（不需要按多次键盘来输入一个字符），因此他们最简单、最直接的想法，就是自己实现输入的处理：**“当用户按下退格键的时候，我删掉文本框里的一个字”**。他们没有意识到，“退格”不一定是一个独立的输入，很可能是输入**一个字**的中间步骤。

> 这也不完全是开发者的责任。处理**平台相关**的输入逻辑，应该是glfw的事情！开发者本身也不容易拿到输入法的状态，何况他们选择用glfw，可能本身也是为了方便跨平台。

这就导致了同时删除预编辑文本和已输入文本的问题。

因此，要解决这个问题，就必须过滤掉一部分glfwInputKey事件。具体来说，当输入法有预编辑文本的时候，只把消息告诉输入法，不告诉应用。

### 两个核心函数

对于glfw的用户来说，glfw分别提供了提供了键盘事件和字符输入事件的[接口](https://www.glfw.org/docs/latest/group__input.html#ga1caf18159767e761185e49a3be019f8d)。

- `glfwSetKeyCallback`
- `glfwSetCharCallback`

设置好这两个回调函数，glfw就会在获得事件的时候，调用这两个回调函数。更具体地说，在`input.c`里面，glfw定义了两个函数。

- `_glfwInputKey`，这个函数会调用key callback
- `_glfwInputChar`，这个函数会调用char callback，这个函数直接和输入法相关

在底层具体平台的实现中（`x11_window.c`或者`cocoa_window.m`），glfw从系统获取键盘事件和输入法事件，并且调用上述两个函数告知应用程序。

### 具体解决方案

X11下，可以通过`XFilterEvent`函数过滤掉多余的事件（包括比如在使用XIM时，关掉预编辑时的退格事件）。glfw本身也调用了这个函数，但总会放行`_glfwInputKey`，导致这个过滤形同虚设。只要把过滤逻辑加回去就行了。

Mac上的解决方案也很简单。TextInput接口提供了一个函数，可以检测当前是否有预编辑文本`hasMarkedText`，只要监测到有预编辑文本，就不调用`_glfwInputKey`。

这种简单的处理逻辑应该能够适用于大部分情况（包括Minecraft和基于Dear ImGUI的一大堆应用）。

### Wayland问题

Wayland下不存在上面提到的重复退格问题——因为根本就没法用输入法。

glfw目前没有实现wayland的text-input-v3协议（令人难绷的是，这个协议从2018年提出到现在，一直处于“unstable”状态。即便wayland下输入法协议的主流就是它，但很多人根本不愿意去适配，宁可等一个“stable”的协议出来）。

很难说glfw和wayland谁是一坨💩，总之把这俩放到一块之后，对需要输入法的人来说，没有一个正常图形界面该有的体验。

我暂时没有搞明白wayland的输入法协议该怎么用，等之后搞清楚了以后再考虑给glfw打个text-input-v3的补丁。