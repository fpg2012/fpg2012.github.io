---
title: 'Arduino和linux串口通信'
date: '2021-04-18'
categories: ["dev"]
tags:
  - "arduino"
  - "串口"
  - "posix"
  - "linux"
---

## 前因

手头有一块（伪）Arduino Uno，现在需要把上面测到的电压数据发送到电脑上了。我知道Arduino官方提供了`Serial.write`和`Serial.read`，利用这些函数可以方便地通过串口发数据给电脑，在Arduino IDE提供的串口监视器上显示出来。但我现在需要自己处理数据，需要让Arduino直接和我的程序通信。对此我毫无头绪。一番搜索尝试之后算是找到了办法。

## 线

我的Arduino UNO和计算机连接的依赖一根USB线，一头是type-B，一头是type-A，通过这个USB提供了虚拟串口，可以假想Arduino和计算机用一条RS-232串行总线连接起来了。利用这个串口，Arduino就可以和计算机通信。

连接到计算机的Arduino被linux包装成一个文件，我这里是`/dev/ttyACM0`，只要对这个文件进行响应的读写，就可以实现通信。但是毕竟串口和硬盘上的文件本质上不同，还是得通过系统对其进行终端控制。linux提供了`termios.h`，里面用一个结构体保存了终端控制的各种属性，属于POSIX标准。很多东西看起来是上一个时代的遗存，从UNIX和电传打字机的时代一直继承到了现在。

## `struct termio`

### 结构体内容

`struct termio`里面保存了终端的各种属性。

1. `c_iflag` 设置输入模式，比如要不要流量控制、要不要对输入字节进行特殊处理
2. `c_oflag` 设置输出模式，比如要不要对输出字节进行特殊处理
3. `c_cflag` 设置控制模式，比如一个字节多宽，有没有奇偶校验位，有几个终止位，要不要进行载波检测，要不要读数据
4. `c_lflag` 设置局部模式（我也不知道为什么叫Local Mode），比如要不要回传、要不要使用标准模式（Canonical Mode，似乎是一行一行读）
5. `c_cc` 一个数组，包含一些特殊设置，比如一次最少读几个字符

前面几个flag都是通过位运算进行控制的，把对应的位设为1则启用，否则禁用。

上面一些设置似乎只和以前的调制解调器有关，比如流量控制、载波监听什么的，对于我们和Arduino通信来说是没什么用的，我们不需要操作系统对我们的数据做太多的处理，因此使用的时候需要禁用掉大多数配置。

对于`c_cc`数组，里面`c_cc[VMIN]`表示一次读写几个字符，如果没有读到这么多字符，`read`系统调用（前面写了，串口在linux看来是个文件）就会一直阻塞，直到超时为止，最大位255（毕竟无符号的8位能表示的最大整数不过如此）。`c_cc[VTIME]`保存了超时信息（timeout），也就是多久算超时，单位是十分秒（0.1秒，decisecond）。

### 具体的配置

参考网上的资料，对于`c_cflag`，禁用`PARENB`、`CSTOPB`，意思是禁用奇偶校验，只用一个停止位。启用`CS8`、`CREAD`和`CLOCAL`，字节8位长（现在真的还有什么设备字节长度不是8位吗？），可以读写。对于`c_lflag`，禁用`ICANON`、`ECHO`、`ECHOE`、`ECHONL`、`ISIG`，禁用标准模式、任何回传、信号字节。对于`c_iflag`，禁用`IXOFF`、`IXON`、`IXANY`，不要流量控制；禁用`IGNBRK`、`BRKINT`、`PARMRK`、`ISTRIP`、`INLCR`、`IGNCR`、`ICRNL`，我们要原始数据，不要特殊处理。对于`c_oflag`，禁用`OPOST`、`ONLCR`，不要特殊处理。

我这里`VMIN`设置为2，因为我配置了我的Arduino一次发送两个字节。VTIME我随便设置了一个值。

波特率也需要设置。使用`cfsetispeed`和`cfsetospeed`可以分别设置读写的波特率。我这里全部设为9600Hz，也就是B9600。

在看了Qt的`QSerialPort`和rust的`serialport` crate之后，我发现还是操作系统提供的接口最为详细完备。

### 总体大致流程

先`open`对应的文件（我这里是`/dev/ttyACM0`），然后利用`tcgetattr`获得终端控制的结构体，对其进行设置，接下来就和普通的文件一样，可以从里面`read`数据了。最后再关闭文件。

## C程序

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdint.h>

#include <fcntl.h>
#include <errno.h>
#include <termios.h>
#include <unistd.h>

// handle memory in different ways
// convert two char into a uint16_t
union Convert {
    char buffer[2];
    uint16_t num;
};

int main() {
    int serial_port = open("/dev/ttyACM0", O_RDWR);
    if(serial_port < 0) {
        printf("Error %i from open: %s\n", errno, strerror(errno));
        exit(0);
    }
    struct termios tty;
    if(tcgetattr(serial_port, &tty) != 0) {
        printf("Error %i from tcgetattr: %s\n", errno, strerror(errno));
    }
    tty.c_cflag &= ~PARENB;
    tty.c_cflag &= ~CSTOPB;
    tty.c_cflag |= CS8;
    tty.c_cflag |= CREAD | CLOCAL;
    tty.c_lflag &= ~ICANON;
    tty.c_lflag &= ~ECHO;
    tty.c_lflag &= ~ECHOE;
    tty.c_lflag &= ~ECHONL;
    tty.c_lflag &= ~ISIG;
    tty.c_iflag &= ~(IXON | IXOFF | IXANY);
    tty.c_iflag &= ~(IGNBRK|BRKINT|PARMRK|ISTRIP|INLCR|IGNCR|ICRNL);
    tty.c_oflag &= ~OPOST;
    tty.c_oflag &= ~ONLCR;
    tty.c_cc[VTIME] = 20;
    tty.c_cc[VMIN] = 2;
    cfsetispeed(&tty, B9600);
    cfsetospeed(&tty, B9600);
    char read_buf[20]; // buffer to use
    union Convert temp;
    while(1) {
        int n = read(serial_port, &read_buf, sizeof(read_buf));
        // ! should handle error here
        // but in my case, error rarely arises
        temp.buffer[0] = read_buf[0];
        temp.buffer[1] = read_buf[1];
        printf("%x\n", (int)temp.num);
    }
    close(serial_port);
}
```

Arduino方面程序如下。这里要注意，不要用`Serial.println`，Arduino的库会因此在后面加上`\r\n`。

```c
union Convert {
  char buffer[2];
  uint16_t num;
};

void setup() {
  Serial.begin(9600);
}
 
void loop() {
  delay(5);
  Convert temp;
  temp.num = analogRead(A0);
  Serial.write(temp.buffer, 2);
}
```

经测最终是可以读到数据的，而且速度很快，不会出现速度不匹配的问题。

## 其他方法

我还尝试使用了Qt的`QSerialPort`来读串口，那个用起来比直接调POSIX接口简单多了。但是不知道为什么，有的时候只读了一个字节，有的时候按我要求读了两个字节，但是高字节和低字节反了。用法可以参考Qt文档。

rust有个crate，`serialport`，也很不错，对底层的操作进行了封装。我最终的程序就是用了这个crate。（因为rust有很方便的线程库，写起来没有C语言这么累人）

## 参考资料

没有这些参考资料我真的写不出这个程序。

1. [Serial Programming Guide for POSIX Operating Systems](https://www.cmrr.umn.edu/~strupp/serial.html#CONTENTS)
2. [Linux Serial Ports Using C/C++](https://blog.mbedded.ninja/programming/operating-systems/linux/linux-serial-ports-using-c-cpp/)
3. [termios(3) - Linux man page](https://linux.die.net/man/3/termios)
4. [Computer terminal - Wikipedia](https://en.wikipedia.org/wiki/Computer_terminal#:~:text=A%20computer%20terminal%20is%20an,a%20computer%20screen%20by%20decades.)
5. [Crate serialport](https://docs.rs/serialport/4.0.1/serialport/)
6. [QSerialPort Class](https://doc.qt.io/qt-5/qserialport.html)
