---
layout: "post"
title: "在现有的btrfs子卷上安装Ubuntu"
tag: ["linux", "ubuntu"]
description: "比想象中的复杂，但又比想象中的简单"
category: ["note"]
date: "2025-01-16"
comment: true
---

Ubuntu的安装程序不能识别btrfs子卷，但是我偏偏又需要把它装到一个现有的btrfs子卷里面，因此才需要像下文那样折腾。

## TL;DR 省流版

在虚拟机里装好一个ubuntu，然后把整个系统复制到目标子卷里面。改改`/etc/fstab`和引导。

## 前情提要

事情是这样的，原先我装了个debian，用掉了所有的空闲空间，文件系统选了btrfs（很有先见之明）。但是因为intel oneapi理论上只适配的ubuntu，在arch和debian上跑会有各种问题。一直以来我都不得不用docker，直到最近才决定和自己和解，装个ubuntu。

但是debian所在的btrfs分区里面有一些很重要的数据，而我现在手边偏偏没有足够空间来备份。综上所述，我只能想办法把ubuntu直接装到一个新的子卷里面。

## 方法

### 在虚拟机里装个ubuntu

先建个`qcow2`映像，之后往里面装ubuntu，不一定要32G，够装系统就行了：

```
$ qemu-img create -f qcow2 ubuntu.qcow2 32G
```

然后写个脚本启动qemu，在同一个目录下新建`start.sh`

```bash
#!/bin/bash

qemu-system-x86_64 \
    -m 16G # 根据实际情况调整虚拟机内存大小 \
    -enable-kvm # 开kvm性能显著更好 \
    -boot uefi \
    -display gtk,gl=on \
    -vga qxl \
    -smp 6 \
    -cpu host \
    -boot order=dc \
    -hda ubuntu.qcow2 \
    -cdrom ubuntu.iso # ubuntu的iso路径 \
```

```
$ chmox +x start.sh
$ ./start.sh
```

然后在里面装好系统。

### 挂载qcow2映像

```
# qemu-nbd --connect /dev/nbd0 ubuntu.qcow2
# mount /dev/nbd0p1 /mnt
```

mount前最好用fdisk检查一下是不是`/dev/nbd0p1`。

### 用rsync复制整个系统到子卷里面

假设目标已经子卷已经挂载到`/ubuntu`，虚拟机的盘片挂载到了`/mnt`。

```
# rsync -aX --progress --stats /mnt/ /ubuntu/
```

注意`/mnt/`不要写成`/mnt`

### 改/etc/fstab和引导

假设ubuntu已经复制到了`/ubuntu`里面。根据个人实际情况自己改`/ubuntu/etc/fstab`，参见[archwiki](https://wiki.archlinux.org/title/Fstab)。

更新grub配置文件，如果os-prober找不到ubuntu，就自己写一条。如果需要自己写，修改或新建`/boot/grub/custom.cfg`，参见[archwiki](https://wiki.archlinux.org/title/GRUB#Dual-booting)。

```
menuentry 'Ubuntu GNU/Linux' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-simple-eea47a38-15db-4ba8-a2ec-a35ee9503ed1' {
	load_video
	insmod gzio
	if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
	insmod part_gpt
	insmod btrfs
	search --no-floppy --fs-uuid --set=root eea47a38-15db-4ba8-a2ec-a35ee9503ed1
	echo	'Loading Ubuntu ...'
	linux	/@ubuntu/boot/vmlinuz root=UUID=eea47a38-15db-4ba8-a2ec-a35ee9503ed1 ro rootflags=subvol=@ubuntu
	echo	'Loading initial ramdisk ...'
	initrd	/@ubuntu/boot/initrd.img
}
```

不要照抄。有几个地方需要根据实际情况修改。

1. 第7行，`root=`后面的部分改成ubuntu所在的btrfs分区的uuid，可以用`lsblk -o +UUID`来查看
2. `linux`是指明内核的命令，`vmlinuz`改成具体的内核文件名。`root=`后面修改同上，`subvol=`后面改成实际的子卷名
3. `initrd`是指明initramfs的命令，后面改成实际initramfs的路径

