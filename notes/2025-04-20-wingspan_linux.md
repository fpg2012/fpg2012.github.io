---
layout: "post"
title: "在Linux用Proton运行展翅翱翔（Wingspan）"
tag: ["Linux", "gaming", "proton", "wingspan"]
description: ""
category: ["note"]
date: "2025-04-20"
comment: true
---

一直以来我都没法在Linux运行Wingspan，一打开就闪退。直到今天才找到一个能用的解决方法

在“库”里面右键游戏，选“属性”，然后设置命令行参数

```
PROTON_USE_WINED3D=1 %command%
```

就能用了。

## Reference

解决方法来自[Steam社区的这个帖子](https://steamcommunity.com/app/221410/discussions/8/3106891514117624752/)。这个帖子2021年就存在了，不知道为什么我以前一直没有找到。

