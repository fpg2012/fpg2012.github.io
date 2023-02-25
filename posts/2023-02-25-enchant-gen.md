---
layout: post
title: Enchant-Gen——MC附魔指令生成器
description: 我写了附魔生成器，[Enchant-Gen](https://fpg2012.github.io/enchant-gen/)。只要动动鼠标在网页上按几个按钮就能生成附魔工具所需的`/give`指令，粘贴到MC中可以直接使用，免去手敲指令的烦恼
tag: [我的世界, 附魔, 网页工具, enchant-gen, Minecraft, enchantment, mc, nth233, command, generator]
category: [post]
comment: true
date: 2023-02-25
---

你是否还在为MC附魔指令太长而烦恼？或是为了搞到一把“火焰附加2+击退2+抢夺3+经验修补+锋利5+横扫之刃3+耐久3”的钻石剑，不得不在铁砧上面敲敲打打半天。如果要输指令生成，那么是这样的

```
/give @p diamond_sword{"Enchantments":[{"id":"fire_aspect","lvl":2},{"id":"knockback","lvl":2},{"id":"looting","lvl":3},{"id":"mending","lvl":1},{"id":"sharpness","lvl":5},{"id":"sweeping_edge","lvl":3},{"id":"unbreaking","lvl":3}]} 1
```

这个指令长度，手敲的速度甚至不如铁砧慢慢附魔。

因此我写了附魔生成器，[Enchant-Gen](https://fpg2012.github.io/enchant-gen/)。只要动动鼠标在网页上按几个按钮就能生成附魔工具所需的`/give`指令，粘贴到MC中可以直接使用。地址如下

[https://fpg2012.github.io/enchant-gen/](https://fpg2012.github.io/enchant-gen/)

> 只支持1.8以上的版本

![网页截图](/assets/enchant-gen.png)

---

做这个东西的起因，其实是因为某一次挂机不小心被怪打死了，身上穿了很久的神装没找回来。因为懒得自己敲命令，就写了这个工具。不过事实证明，写这东西比自己真的去手敲命令费时多了……

Enchant-Gen的页面逻辑完全使用原生Javascript实现，没有使用任何框架，所以代码看起来很直截了当。附魔相关的数据直接存在一个数组里面。

欢迎在[GitHub](https://github.com/fpg2012/enchant-gen)上贡献代码和提交issue。
