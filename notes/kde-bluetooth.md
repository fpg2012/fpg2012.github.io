---
layout: "post"
title: "解决KDE登录时不默认启用蓝牙的问题"
tag: ["KDE", "蓝牙"]
category: ["note"]
date: "2024-03-19"
comment: true
---

最近每次登录KDE后，蓝牙都会默认被禁用。即使重新把蓝牙配置成“默认启用”，也还是无济于事。可能是KDE的一个bug。

[Reddit上](https://www.reddit.com/r/ManjaroLinux/comments/12fgj3o/kde_plasma_bluetooth_not_automatically_powered_on/)给出了一个简单粗暴的解决方案。

删掉`~/.config/bluedevilgloablrc`。

然后在KDE设置里面修改蓝牙配置（重新生成一份这个文件）。
