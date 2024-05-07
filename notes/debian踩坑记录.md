---
layout: "post"
title: "debian踩坑记录"
tag: ["debian", "linux"]
description: "记录安装debian以来踩到的坑"
category: ["note"]
date: "2024-05-07"
comment: true
---

[原帖（不定期更新）](https://forum.soulsand.top/d/167-an-zhuang-debianhou-yu-dao-de-keng/15)


debian作为一个稳定的Linux发行版，基本上东西都是开箱即用的。不过偶尔也需要折腾。

我认为的目前比较不折腾的方案：

尽量直接用带桌面环境的iso镜像安装，桌面环境尽量用稳定的Gnome、KDE。由于Debian仓库里面的Gnome一般不是最新版，所以插件不兼容的问题比较轻微。

## 1 GNOME插件

GNOME必用的插件：Tray Icon、GTile、gnome-input-method-kimpanel

如有必要还可以考虑装个农历日历的插件。

## 2 能联网，但是WiFi不由Network Manager管理

具体表现为设置当中显示“No WiFi Adapter Found”

解决方案：

修改`/etc/NetworkManger/NetworkManager.conf`，把`managed=false`改成`managed=true`
操作完之后重启。

## 3 Intel Arc a770显卡没法使用

具体表现：找不到显示器/GPU

解决方案：

用6.5版本以上的内核。比如，安装`linux-image-amd64-6.5.0`。
也可以自己编译内核。编译时使用`make bindeb-pkg`即可直接打包。注意，`make deb-pkg`现在似乎不太管用了。

## 4 Sway下XWayland应用分数缩放会模糊

具体表现：Chromium、Firefox、vscode等应用

解决方案：无解。Firefox可以引入Mozilla的源，安装新版以避免使用XWayland。Chromium以及一批基于electron的应用可以启用`--ozone-platform-hint=auto`避免使用XWayland。

## 5 fcitx5不能自启动

具体表现：不自启动

解决方案：im-config我是没搞懂该怎么用，于是使用最简单的解决方案——在Gnome Tweaks中设置fcitx5为自启动应用。如果使用Sway等wm，直接在启动脚本里面启动fcitx5就行了。

## 6 Sway下Chromium等软件使用Wayland后，没法用输入法

解决方案：试试添加环境变量能否解决问题，参考archwiki。可能要等Sway更新。

## 7 Gnome 农历日历无法启用

具体表现：显示缺少依赖

解决方案：把作者写的ChineseCanlendar的依赖装了。

> 吐槽：我很疑惑，为什么这个插件的作者不干脆把插件开源到GitHub/GitLab上。

## 8 中文字体很丑

具体表现：点阵字体/日文字型

解决方案：
安装自己觉得好看的字体。推荐`fonts-noto-cjk`思源黑体和思源宋体。然后在Gnome Tweaks中修改字体。
更进一步，可以修改fontconfig的配置，让默认字体也好看一下。修改`~/.config/fontconfig/fonts.conf`，以下是我的配置

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<fontconfig>
  <dir>~/.fonts</dir>
  <match>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>JetBrains Mono NL</string>
      <string>Ubuntu Mono</string>
      <string>Noto Color Emoji</string>
      <string>Noto Sans CJK SC</string>
    </edit>
  </match>
  <match>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Sans CJK SC</string>
      <string>Noto Sans</string>
      <string>Noto Sans Arabic</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  <match>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif</string>
      <string>Noto Serif CJK SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  <match target="font">
    <edit mode="assign" name="antialias">
      <bool>true</bool>
    </edit>
  </match>
  <match target="font">
    <edit mode="assign" name="hinting">
      <bool>true</bool>
    </edit>
  </match>
  <match target="font">
    <edit mode="assign" name="hintstyle">
      <const>hintfull</const>
    </edit>
  </match>
  <match target="font">
    <edit mode="assign" name="rgba">
      <const>none</const>
    </edit>
  </match>
  <match target="font">
    <edit mode="assign" name="lcdfilter">
      <const>lcddefault</const>
    </edit>
  </match>
  <match target="font">
    <edit mode="assign" name="embeddedbitmap">
      <bool>true</bool>
    </edit>
  </match>
</fontconfig>
```

## 9 apt update失败

解决方案：一般是软件仓库镜像没有正确设置。修改软件仓库镜像（建议顺便改成国内源），参考 https://mirrors.tuna.tsinghua.edu.cn/help/debian/

## 10 自己的用户不能用sudo命令

具体表现：不在sudo组当中。

解决方案：
解法一：`su`进入root，然后`visudo`，修改sudo的配置文件，给某个具体的用户/用户组使用sudo的权力。
解法二：把具体的某个用户加入`sudo`组

```
usermod [你的用户名] -a -G sudo
```

操作完之后注销重新登陆

## 11 仓库里没有某某软件/仓库里没有某某软件的某某版本

解决方案：
解法一：自己编译安装到`/usr/local`或者其他随便什么地方（记得改PATH）
解法二：下载别人打包好的`deb`
解法三：用nix
解法四：实在不得已，可以用flatpak或者AppImage
解法五：环境实在太难配置，不得已可以用docker
解法六：虚拟机
~~解法七：用arch~~

> 软件包少/软件包旧，其实是导致debian比arch还要折腾的根本原因

## 12 安装的时候不能创建Btrfs子卷

解决方案：

有些人的办法是：在安装的时候`ctrl-alt-f6`切换到别的tty，然后手动分子卷。（最合理的办法）

我的办法是：
1. 正常安装，分区选btrfs。此时安装介质会创建一个`@rootfs`子卷，然后把全部东西都放在里面。
2. 安装完成后，进另一个Linux系统或者用U盘进LiveCD救援系统，然后手动分子卷，把`@rootfs`里面的东西移动到新的子卷里面（很朴素的办法，但是一般可行）
3. 相对应地修改`/etc/fstab`，让系统启动时正确地挂载各个子卷。

终极办法是：不用btrfs。实际上我觉得大部分人用默认的ext4就够了。

## 13 没有默认启用GPU加速视频编解码

解决方案：
参考 https://wiki.debian.org/HardwareVideoAcceleration
对于intel GPU，安装`intel-media-va-driver` 或者`intel-media-va-driver-non-free`。
然后检查看看`vainfo`命令的输出是否正确。

## 14 依赖冲突

具体表现：用dpkg强制安装软件，或者安装来自非官方源的软件，或者安装其他deb系发行版的源的软件时，版本不一致造成依赖冲突。

预防措施：不要做上述事情。遇事不决可以考虑用一下nix。

解决方案：把有问题的源去掉，把造成冲突的软件包一个一个卸掉，[手动下载](https://pkgs.org)并强制安装正确版本的软件包。
强制卸载
```
dpkg --remove --force-all [包名]
```
强制安装
```
dpkg -i [deb包路径]
```
然后尝试修复
```
apt -f install
```

> 这是我最讨厌debian/ubuntu/fedora等发行版的一点，傻逼依赖问题很容易发生，而且处理起来经常半小时起步
> 这也是Arch这类发行版看起来很折腾、其实很省心的原因

所以debian这种发行版更适合用在万年不更新的场合。桌面系统还是尽量用Arch、OpenSUSE风滚草、NixOS这类。头疼的问题一般有人替你头疼过了。

## 15 Arch Linux下grub的os-prober无法找到另一个磁盘的btrfs分区上的debian内核

具体表现：更新grub配置后没有debian的启动项。

解决方案：自己写一个grub的menuenrty到/boot/grub/custom.conf里面。具体写法参考Arch Wiki的grub页面。

## 16 firefox版本太旧

不要用仓库里的firefox-esr，直接添加Mozilla官方给的ppa源。
