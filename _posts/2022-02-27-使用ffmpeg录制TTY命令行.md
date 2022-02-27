---
title: 没有图形界面，在tty命令行下录屏
date: "2022-02-27"
description: "ffmpeg"
categories: ["dev"]
tags:
  - FFmpeg
  - Framebuffer
  - 命令行
  - linux
comments: true
---

「录屏」一词，说起来仿佛是图形界面的专属。现有的趁手录屏工具很多也的确需要桌面环境才能工作。比方说常用的obs。如果在tty中执行obs的录屏命令：

```
obs --startrecording
```

很遗憾，无效。obs会提示"cannot connect to display"。大概是因为运行obs需要显示一个Qt窗口。

好在tty下录屏并非毫无办法，ffmpeg提供了一条路，直接读取Linux的framebuffer：`/dev/fb*`。

> 切换tty，一般是按`ctrl`+`alt`+`F1~F6`，对应tty1到6。我的机器上tty1和tty2对应桌面环境。

## /dev/fb*

UNIX操作系统最重要的设计原则之一就是“一切皆文件”。Linux继承了这个优点，将一系列设备抽象为设备文件，放置在`/dev`目录下。

显示设备也不例外。图形显示器被抽象为一个帧缓冲〔framebuffer〕文件，也就是本节标题中的`/dev/fb*`，在我的机器上是`/dev/fb0`，如果电脑连接了多个显示器，或许还会有`/dev/fb1`等等。要获取显示的内容，可以直接读取此文件；要操作显示的内容，也可以直接修改此文件——这个文件充当了程序员和Linux间的接口，抽象了底层的图形操作，对用户空间的程序编写者隐藏细节。

我们可以认为`/dev/fb*`当中存放了屏幕上各个像素的颜色。只要能够不断读取这些信息，转化成视频格式，录屏就完成了。

这当然可以实现，比如我们打开tty。

```
cp /dev/fb0 test
```

然后做一些操作，让屏幕显得不同。接着执行：

```
cat test >> /dev/fb0
```

我们会发现屏幕变回去了。实际上我们实现了截图。

[这篇博文](https://cmcenroe.me/2018/01/30/fbclock.html)讲解了利用帧缓冲设备和mmap实现像素级操作屏幕像素的方法。

## 使用FFmpeg进行录制

要把一系列图片编码成一段视频，FFmpeg应该是最合适的工具。不过实际上不必先获取大量“截图”再生成视频，FFmpeg可以直接从`/dev/fb*`获取输入，然后我们只要设定输出格式为mp4（或者其他视频格式），就实现了tty下录屏的方法。

比如：

```
ffmpeg -f fbdev -i /dev/fb0 screenrecord.mp4
```

`-f`指定了输入格式是`fbdev`，也就是帧缓冲设备〔framebuffer device〕的格式，`-i`指定输入，最后指定输出，ffmpeg会自动选择输出格式。

如果没有意外，按下回车就立刻开始录屏了。（要注意权限问题）

如果录屏的时候要做其他事情怎么办？我的办法是切换到另一个tty，简单粗暴。

## 不只是录屏

FFmpeg不仅仅可以读取帧缓冲设备，还可以修改它。完全可以使用它在tty下播放视频。

```
ffmpeg -i screenrecord.mp4 -pix_fmt bgra -f fbdev /dev/fb0
```

会发现刚才录制的视频开始播起来了。fbdev的颜色格式似乎一般是BGRA，不同于RGBA。

## 参考

[Programming the Linux Framebuffer · C. McEnroe](https://cmcenroe.me/2018/01/30/fbclock.html)

[FFmpeg Documentation](https://ffmpeg.org/documentation.html)

[Linux内核关于帧缓冲设备的文档](https://www.kernel.org/doc/html/latest/fb/framebuffer.html)

[关于ffmpeg如何输出到framebuffer的问答](http://unix.stackexchange.com/questions/342815/how-to-send-ffmpeg-output-to-framebuffer)
