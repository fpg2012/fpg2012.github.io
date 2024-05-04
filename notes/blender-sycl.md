---
layout: "post"
title: "解决blender找不到libsycl.so.6的问题"
tag: ["blender", "intel", "sycl"]
description: ""
category: ["note"]
date: "2024-05-04"
comment: true
---

## 前因

大约半年前，我Arch Linux上的blender突然间打不开了。当时排查了半天才发现是因为没有设置intel oneapi的环境变量。安装`intel-oneapi-basekit`，执行`/opt/intel/oneapi/setvars.sh`后，方可使用blender。

几个月前某次intel oneapi更新之后，blender又打不开了……无论怎么设置环境变量都不管用。打不开的原因是找不到libsycl.so.6。我翻了一下`/opt/intel/oneapi`，发现确实只有libsycl.so.7。尝试过安装旧版oneapi-basekit，一通操作之后虽然可以启动blender，但是无法使用intel显卡的硬件加速。

## 解决方案

不要使用Arch Linux软件仓库里的blender，直接从blender官网下载可执行文件！

就这么简单。

Arch仓库里面的blender是有问题的。尽管archbbs上面有人提出blender无法启动的问题，但是似乎一直没有得到重视，快一年过去了，问题依旧存在。
