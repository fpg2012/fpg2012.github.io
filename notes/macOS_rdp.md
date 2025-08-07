---
title: macOS下rdp客户端方案
category: [note]
tag: ["rdp", "远程桌面"]
comment: true
date: 2025-08-07
layout: post
---

最近逐渐习惯了使用macOS本身，但是对于它的生态还是不太适应，总是想着用Linux下习惯的开源方案来解决问题。最近人在外地，偶尔需要要用rdp连接家里的台式机。我习惯于使用remmina（个人非常喜欢这个客户端），然而macOS毕竟不是linux，用不了。

于是开源方案似乎只剩下freerdp一个选择了。

## 安装

首先安装freerdp

```
brew install freerdp
```

应该会下载老半天……然后获得了`xfreerdp`这个命令。这个东西要正常运行，还需要有个xserver。这里用`xquartz`

```
brew install xquartz
```

## 使用

使用xfreerdp前，先启动xquartz。然后在命令行连接，比如：

```
xfreerdp /v:[地址，如localhost] /u:[远程机器的用户名] /size:1920x1080
```
