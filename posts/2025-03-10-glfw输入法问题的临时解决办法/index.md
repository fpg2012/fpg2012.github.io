---
title: GLFW输入法的退格问题——Linux混乱不堪的输入法生态
category: ["dev"]
tag: ["glfw", "输入法", "imgui", "linux", "xim", "x_input_method", "x11", "IME", "CJK"]
date: "2025-03-10"
comment: true
description: ""
layout: post
---
## 0 诡异的退格键

最近在用glfw和dear imgui写一个简单的deepseek[客户端](https://github.com/fpg2012/ds-cpp)，又遇到了“喜闻乐见”的输入法问题。最令人恼火的就是退格键不能被正确处理的问题。就像下面这个视频展示的，在输入预编辑的时候，按下退格键不仅会删除预编辑的内容，还会导致已经输入的内容被删掉，输入体验稀烂。

<div style="width: 100; display: flex; justify-content: center">
<video controls width="400">
  <source src="输入法问题.webm" type="video/webm" />

  Download the
  <a href="输入法问题.webm">webm</a>
</video>
</div>

> 在Linux版本的Minecraft上也会有这样的问题，问题的根源同样是glfw[^mcbug]。

另外，在Wayland下，因为没有实现wayland的输入法协议，glfw直接用不了输入法。

## 1 临时解决办法

### 强制使用X11

目前Wayland下面的输入法问题可以说是一团糟，一切都处于过渡状态。解决输入法用不了的最好办法，就是不要用Wayland。在glfwInit()之前，强制glfw选定X11平台。

```c
#ifdef __linux__
    glfwInitHint(GLFW_PLATFORM, GLFW_PLATFORM_X11);
#endif
```

### 给glfw打补丁

GLFW处理XIM协议[^xim]的方法不太正确，有些键盘事件没有被正确过滤掉（比如输入时的退格键）。下载这个[补丁](https://github.com/fpg2012/ds-cpp/blob/main/glfw_x11_ime.patch)，然后用`patch`命令打到glfw 3.4的源代码里面去。这个补丁修改的东西其实很简单，就是如果事件被过滤掉，就无视这个事件。类似的解决方案其实在MC的那个bug report里面就有人给出了，不知道为什么glfw到现在还是没有改正过来。

```
@@ -1242,6 +1245,9 @@ static void processEvent(XEvent *event)
 
         case KeyPress:
         {
+            if (filtered) {
+                return;
+            }
             const int key = translateKey(keycode);
             const int mods = translateState(event->xkey.state);
             const int plain = !(mods & (GLFW_MOD_CONTROL | GLFW_MOD_ALT));
```

## 2 Linux混乱不堪的输入法

Linux下输入法问题这么多，很大程度是因为没有一个稳定、统一的协议，而且主要开发者里面中国人和日本人不多，因此对这个问题不是很重视。最早X11制定了一个XIM协议，用于和输入法通信。Tedyin的博客[^tedyin]给出了一个很好的例子解释XIM协议。XIM协议看起来简洁明了，而且也能work，但据说在特定条件下会导致程序卡死[^css_xim]。我是没搞懂为什么这个问题不能通过更新XIM协议而来解决，总之后来GTK和Qt分别开发了自己的IM Module，从此天下大乱，装个输入法都要配一堆莫名其妙的环境变量。而GLFW既不是GTK，也不是Qt，就更麻烦。在输入法协议上层，为了方便输入法开发，又出现了ibus和fcitx。ibus据说在非GNOME环境下表现不佳（但是我没查到具体的问题），GNOME下的拼音输入也有不少bug[^ibus_ubuntu]。社区持续的推广下，现在国人最常用是fcitx。

Wayland的出现非但没有缓解输入法，反而把这个问题进一步恶化了。上Arch中文论坛搜“Wayland+输入法”，能搜出来一整页的帖子。Wayland自己另起炉灶，搞了v1-v4一系列协议[^css_wayland]，compositor的兼容情况各不相同。应用开发者通常也不会把IME支持放在比较优先的位置，就导致过渡阶段💩一样的体验。

总之，在2025年的今天，Linux的输入法问题成了最混乱、最糟糕、最劝退的问题之一。主要开发者长期忽视IME的支持，社区不断分裂，造新的轮子，导致新的问题。就结果而言，现在哪怕是处理一个很常见的输入法问题，都需要很多无关的知识——Linux的输入法不应该这么复杂，本来应该和Windows一样简单才对。

[^mcbug]: [MC-258708 Deleting candidate CJK words in IME also deletes text already entered](https://report.bugs.mojang.com/servicedesk/customer/portal/2/MC-258708)
[^xim]: [XIM协议](https://www.x.org/releases/X11R7.6/doc/libX11/specs/XIM/xim.html)
[^tedyin]: [Tedyin - A Brief Intro to Input Method Framework, Linux IME, and XIM](https://tedyin.com/posts/a-brief-intro-to-linux-input-method-framework/)
[^css_xim]: [csslayer关于XIM的议论](https://www.csslayer.info/wordpress/tag/xim/)
[^ibus_ubuntu]: [早年ubuntu论坛上的讨论](https://forum.ubuntu.org.cn/viewtopic.php?t=460613)
[^css_wayland]: [csslayer - Chrome/Chromium 今日 Wayland 输入法支持现状](https://www.csslayer.info/wordpress/fcitx-dev/chrome-state-of-input-method-on-wayland/)
