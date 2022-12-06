---
layout: post
title: "使用无头的wayvnc做远程桌面——乱水"
date: "2022-12-5"
description: "虽说服务器上一般没有必要跑图形界面，但还是偶尔会碰到有些烦人的程序CLI不能跑端解决的问题。不过前几天我发现了WayVNC，十分适合没有物理屏幕的远程服务器。一方面是FAQ里写得清清楚楚，另一方面是用wlroots做合成器〔Compositor〕的窗口管理器，比如sway，十分的轻量。图省事我用了Nix来安装。"
tag: [note, "破事水", "远程桌面", "wayvnc", "wayland", "sway"]
category: [note]
comment: true
---

## 起因

虽说服务器上一般没有必要跑图形界面，但还是偶尔会碰到有些烦人的程序CLI不能跑，比如百度网盘。

正巧，远古MC存档的备份就在百度网盘上……最后折腾了半天，也没成功把远程桌面搞起来，最后还是用`Baidupcs-Go`这个第三方CLI客户端解决的问题。

不过前几天我发现了`WayVNC`，十分适合没有物理屏幕的远程服务器。一方面是FAQ里写得清清楚楚，另一方面是用`wlroots`做合成器〔Compositor〕的窗口管理器，比如`sway`，十分的轻量。

## 搭建

因为阿里云的服务器用的是debian 10 buster这个远古版本，包基本上旧得不行，比如就没有sway。要安装可以参照[sway的wiki关于debian 10的这篇文章](https://github.com/swaywm/sway/wiki/Debian-10-\(Buster\)-Installation)手动编译，麻烦的很。所以选择用Nix。

### 安装Nix

参照[Nix的文档](https://nixos.org/download.html#download-nix).

执行脚本，安装Nix（多用户）:

```bash
$ sh <(curl -L https://nixos.org/nix/install) --daemon
```

然后重启一下服务器。Nix就安装好了。

### 安装所需的软件包

```bash
nix-env --install --attr sway wayvnc
```

我习惯安个浏览器和终端仿真器

```bash
nix-env --install --attr firefox konsole
```

> 为什么是Qt写的konsole？因为我发现更轻量的kitty和alacritty都没法用，似乎都和openGL没法使用有关。至于为什么openGL没法用，我不太懂。

然后记得配置一下sway。

### 启动`wayvnc`


首先进入`nix-shell`。

```bash
nix-shell -p sway wayvnc firefox konsole
```

然后按照[WayVNC的FAQ](https://github.com/any1/wayvnc/blob/master/FAQ.md)，以无头〔headless〕模式启动sway。

设置三个环境变量

```bash
export WLR_BACKENDS=headless
export WLR_LIBINPUT_NO_DEVICES=1
export WAYLAND_DISPLAY=wayland-1
```

然后启动sway：

```bash
sway & # 加上&是为了sway可以在后台运行
```

然后启动WayVNC

```bash
wayvnc 0.0.0.0 2304 # 端口号改成自己需要的
```

如果一切正常，那么现在可以用VNC工具，比如`vinagre`，连接远程桌面了。

> 注意！如果不进一步配置，那么这个连接没有任何密码、没有加密，也就不安全。如果要长期开着WayVNC，建议加上身份校验，参考[WayVNC的GitHub页面](https://github.com/any1/wayvnc)。

如果要调整屏幕的大小，开启sway之后执行下面的命令：

```bash
swaymsg output "HEADLESS-1" resolution 1920x1080 # 大小自己调
```

## 后记

虽说服务器带宽有点小，画面传过来有点卡顿掉帧，但毕竟不是不能用……应付偶尔的需求足够了。

