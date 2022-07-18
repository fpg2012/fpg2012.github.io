---
layout: post
title: "阿里云轻量应用服务器开swap——乱水"
date: "2022-07-19"
description: "之前的云服务器到期了，这次看阿里新加坡的轻量应用服务器价格不错，就买了。但是到手之后发现如果启动mc服务器，服务器的内存有时会有些不足。大概是因为服务器加载新区块的时候可能会突然增加一些内存需求。然而系统内存不够用，服务端就崩掉了。此时一般都会想到开swap文件，方便系统在缺内存的时候把一些进程suspend，swap到交换空间里面。然而谁知道阿里的这个破镜像竟然没有自带`mkswap`和`swapon`这种基础命令。因此需要手动安装。我用debian，所以下面的内容都针对debian（理论上debian系的都一样）"
tag: [note, "云服务", "破事水", "swap"]
category: [note]
comment: true
---

## 起因

之前的云服务器到期了，这次看阿里新加坡的轻量应用服务器价格不错，就买了。但是到手之后发现如果启动mc服务器，服务器的内存有时会有些不足。大概是因为服务器加载新区块的时候可能会突然增加一些内存需求。然而系统内存不够用，服务端就崩掉了。

此时一般都会想到开swap文件，方便系统在缺内存的时候把一些进程suspend，swap到交换空间里面。然而谁知道阿里的这个破镜像竟然没有自带`mkswap`和`swapon`这种基础命令。因此需要手动安装。我用debian，所以下面的内容都针对debian（理论上debian系的都一样）

## 流程

```
sudo apt reinstall util-linux
```

然后新建一个4G大小的空文件

```
sudo fallocate -l 1G /swapfile
```

> 或者也可以用`dd`.
> 
> ```
> sudo dd if=/dev/zero of=/swapfile bs=1024 count=1G
> ```
> 
> `bs`表示一次操作的字节数。
> 
> 有空我可以整理一下`dd`的常见用法。

接着修改权限

```
sudo chmod 600 /swapfile
```

然后`mkswap`

```
sudo mkswap /swapfile
```

接下来就可以启用了

```
sudo swapon /swapfile
```

## 调整`swappiness`

理论上至此应该完成了，但是阿里的镜像中默认把swappiness参数调成了0，这会导致内核根本不会使用swap。所以需要把这个参数调整到大于0的某个值，比如60。数字越高，表示swap使用策略越激进。

```
sudo sysctl vm.swappiness=50
```

## 额外操作

如果要停止使用交换文件，使用`swapoff`。

```
sudo swapoff -v /swapfile
```

另外，按上述方式配置，每次服务器重启都得重新手动启动swap。如果要开机自动启用交换文件，可以修改`/etc/fstab`。添加下面这行，这样每次开机都会自动挂上交换文件。

```
/swapfile	swap	swap	default	0	0
```

## 关于swap的讨论

swap其实并不能完美解决内存不足的问题，一旦涉及到硬盘I/O，很多工作都会变得很慢。不过我的目的只是让mc服务器这个内存占用大户在偶尔需要大量内存的时候，不至于因为内存不足而直接崩掉。那么swap已经让我达到目的了。

## 参考

本文的内容并非十分的“原创”，参考了以下来源

- [Create a Linux Swap File - linuxize](https://linuxize.com/post/create-a-linux-swap-file/)
- [What does swappiness do and how does it affect swap_tendency?](https://access.redhat.com/solutions/103833)
- [util-linux - wikipedia](https://en.wikipedia.org/wiki/Util-linux)
