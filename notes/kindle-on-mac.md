---
layout: post
title: "解决kindle在mac上无法识别的问题"
date: "2026-04-17"
description: "其实可以识别，但是需要手动挂载"
tag: [note, "macos", "kindle"]
category: [note]
comment: true
---

我的kindle kpw5连接m2 macbook air的时候，一般都没法被系统/calibre识别，导书的时候每次都要折腾半天。

> “能用一条USB线解决的事情，就不要用无线的方法”

于是排查了一下问题的原因。运行

```
system_profiler SPUSBDataType
```

发现有一段输出如下

```
USB:

    USB 3.1 Bus:

      Host Controller Driver: AppleT8112USBXHCI

        Internal Storage:

          Product ID: 0x0324
          Vendor ID: 0x1949  (Lab126)
          Version: 4.09
          Serial Number: G001PX11222501M9
          Speed: Up to 480 Mb/s
          Location ID: 0x00100000 / 1
          Current Available (mA): 500
          Current Required (mA): 500
          Extra Operating Current (mA): 0
          Media:
            Internal Storage:
              Capacity: 6.7 GB (6,702,472,704 bytes)
              Removable Media: Yes
              BSD Name: disk4
              Logical Unit: 0
              Partition Map Type: Unknown
              S.M.A.R.T. status: Verified
              USB Interface: 0
```

这个来自Lab126的InternalStorage设备，就是我的kindle。因此，**mac实际上识别到了kindle**，只是不知道为什么，没有主动挂载上来。

接下来手动挂载一下即可解决问题。根据上面的输出，我这个设备的BSD Name是disk4：

```
diskutil mount /dev/disk4
```

这条命令执行完，应该就能看到kindle出现在访达里面了。过后calibre应该也能正确识别设备。