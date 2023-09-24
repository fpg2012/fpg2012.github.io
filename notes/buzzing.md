---
layout: post
title: "解决Linux下音频持续输出高频噪声的问题"
date: "2023-9-24"
description: "很可能是在Linux下，声卡默认启用了省电模式，导致其中有电容持续充放电。关闭省电模式即可。"
tag: [note, "破事水", "linux", "音频", "噪声"]
category: [note]
comment: true
---

## 原因

很可能是在Linux下，声卡默认启用了省电模式，导致其中有电容持续充放电。关闭省电模式即可。

## 处理

在开始之前，看看用的是哪个声卡，我这里是snd_hda_intel。如果是snd_usb_audio，则下文可能需要做出相应更改。

```
cat /proc/asound/modules
```

首先，检查是不是省电模式，如果输出0，则不是省电模式，请另找原因。

```
cat /sys/module/snd_hda_intel/parameters/power_save
```

然后，如果只需要临时解决，可以往这个文件里面写0：

```
echo 0 > /sys/module/snd_hda_intel/parameters/power_save
```

如果需要永久解决，可以添加配置文件，命名为`audio_disable_powersave.conf`：

```
sudo vim /etc/modprobe.d/audio_disable_powersave.conf
```

添加一行配置：

```
options snd_hda_intel power_save=0
```

搞定。

## 结果

问题缓解了很多，但仔细听还是有极小声的高频噪声（可能我的耳朵比较灵）。

所以平常不用音响的时候还是得把音响的电源关掉。

## 起因以及排查过程

大概一两个月前搬进租屋开始，我就感觉电脑的音响一直在持续地发出高频噪音。这种噪音平时难以察觉，但是当四周特别安静的时候，就会格外恼人。然而我一直找不到导致高频噪音的原因。当时我发现Windows下没有这个问题，因此初步判断和Linux有关，但是加上回声降噪之后并没有解决问题。

最近从租屋搬回家，这一问题居然神秘地消失了。直到今天，我感觉显示器的音频输出驱动能力不够强，把音频线接到了主机上，噪声又出现了。所以我判定噪声和主板的声卡有关，一搜……果然是。

## 参考/解决方法来源

[How I Fixed Buzzing Noise Coming from Speakers in Linux](https://itsfoss.com/buzzing-noise-speaker-linux)
