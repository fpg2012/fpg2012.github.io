---
title: "使用Intel Arc A770和RVC模型进行AI翻唱"
tag: ["AI", "Intel", "A770", "AI翻唱"]
layout: "post"
category: ["dev"]
comment: true
date: "2024-07-21"
---

去年八月份我在尝试AI翻唱的时候，没能在这块显卡上把so-vits-ai给跑起来（可能也是因为当时做的调查很不充分，没找到[这个repo](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI)。如今已经一年过去，情况已经有了很多变化，我也比去年要更有时间。

多亏了这个[Pull Request](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/pull/1204)，I卡上面也能丝滑地进行AI翻唱了，效果很好，配置很简单。

## 准备Docker环境

以下内容针对Linux，如果你使用Windows，那么建议使用WSL2，可以参考官方教程（见文末参考）。

如果没有安装docker，那就安装一下。启用docker服务。

```
# pacman -S docker
# systemctl start docker
```

然后拉取Intel的官方映像（Image）。我自己就直接用去年折腾AI画图的那个映像了。

```
# docker pull intel/intel-extension-for-pytorch:xpu-flex-2.0.110-xpu
```

然后检查一下环境是否正常。运行映像，`<image_name>:<tag>`自己替换一下（`intel-extension-for-pytorch:xpu-flex-2.0.110-xpu`），下文不再说明。

```
# docker run --rm -it --privileged --device=/dev/dri --ipc=host <image_name>:<tag> bash
```

然后检查一下是否能跑。在docker里运行以下代码，看能否正确输出IPEX的版本、显卡设备的信息。

```
$ python -c "import torch; import intel_extension_for_pytorch as ipex; print(torch.__version__); print(ipex.__version__); [print(f'[{i}]: {torch.xpu.get_device_properties(i)}') for i in range(torch.xpu.device_count())];"
```

## 不使用Docker？

我个人强烈建议非Ubuntu 22.04的用户使用Docker，不然真的太折腾了。我自己反正是没能在Arch上跑起来，部分原因是intel-oneapi-basekit太新了。

Ubuntu 22.04下可以按照官方教程（见文末参考）把IPEX的环境配一下（ps. 我自己没尝试过）

## 准备好RVC-WebUI

找个合适的位置，我这里假设是`/workspace`，把这个repo克隆下来。

```
https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git rvc
```

然后进docker映像，启动命令里面记得把`/workspace/rvc`映射到容器的`/opt/rvc`，这里我们顺便把容器的`7865`端口映射出来。

```
# docker run --rm -it -v /workspace/lab/rvc:/opt/rvc -p 7865:7865 --privileged --device=/dev/dri --ipc=host <image_name>:<tag> bash
```

然后在容器的命令行里面配置一下环境，在执行pip命令之前可以顺便换成国内的镜像加加速。

```
$ cd /opt/rvc
$ pip install -r requirements-ipex.txt
# sudo apt install ffmpeg
```

如果没有出现问题，可以把容器的当前状态commit到一个新的映像里面，省得每次启动都要配一遍环境。`<container_id>`指的是容器的id，可以`docker ps`看一下。`rvc`是新映像的名字。

```
# docker commit <container_id> rvc
```

## 下载RVC所需的必要模型

上[Huggingface Hub](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/)找对应路径的模型，放到`/workspace/rvc`下的对应位置：

- assets/hubert/hubert_base.pt
- assets/pretrained
- assets/uvr5_weights
- assets/pretrained_v2

## 找个训练好的音色模型

比如说川大统领的[RVC音色模型](https://huggingface.co/sail-rvc/Donald_Trump__RVC_v2_)。我们需要两个文件，一个是模型本身`model.pth`，另一个是index文件`model.index`。把模型放到`assets/weights`里面。

## 开始！

在容器中运行`infer-web.py`

```
python3 infer-web.py
```

然后在浏览器打开对应的网址。如果不喜欢界面是全英文，可以把源码里面的`i18n/i18n.py`改一下。

首先找首歌。WebUI自带了一个界面供我们调用模型分离主要人声和伴奏。

拿到纯人声的歌声之后，我们在一开始的页面选中刚才下载的音色模型、对应的index文件、要替换音色的纯人声歌声，然后直接点一下转换就成了（如果刚才没有下载rmvpe模型，这里要把音高提取算法换成别的，其他参数一般直接使用默认值即可）。

<audio controls>
    <source src="Trump.mp3" type="audio/mp3"/>
Your browser does not support the audio element.
</audio>

## 参考

- [Retrieval-based-Voice-Conversion-WebUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI?tab=readme-ov-file)
- [IPEX](https://intel.github.io/intel-extension-for-pytorch/cpu/latest/#)
- 我之前的文章[使用Intel Arc A770进行AI画图](https://nth233.top/posts/2023-09-03-intel-arc-a770-ai)
