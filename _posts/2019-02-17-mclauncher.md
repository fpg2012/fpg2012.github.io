---
title: 自制MC启动器的失败尝试
categories: [dev]
tags: 
  - minecraft
  - 折腾记录
description: 严格来说是「半失败」的尝试
date: "2019-02-17T13:54:03"
---


本打算在寒假重拾MC，却突然发现HMCL在arch上用不了了，明明18年八月初还是可以用的。打开HMCL后ui无法被正常渲染，只有空白窗口一个。疑似是arch的锅，也可能是openjfx的bug（但是我就算是换用oracle的jdk问题也依然存在，并且就算是一路回退到2018年七月的版本，问题也依然没有解决）。于是便再次将自制MC启动器提上日程，作为六月前的最后一次在电脑上的折腾。

这不是我第一次尝试自制MC启动器，三四年前不会用HMCL的时候也想过自己做一个。但是当时连MC为什么要用启动器都不知道，自制启动器一直停留在「想法」阶段。

上网查了一些MC启动器相关的东西，算是大致了解了一下MC启动器的原理。但是网上的很多博文对具体的细节语焉不详，还得自己翻HMCL或者JMCCC的源代码慢慢理解。

-----

## MC启动器的原理

简而言之，启动器的工作就是列出一堆option，生成启动脚本，然后用脚本启动MC。

### 为什么MC需要启动器？

按照[BMCL作者的说法](https://www.zhihu.com/question/49997128/answer/119951802)，MC需要启动器的原因大致有几点：

1. MC启动需要传入JVM参数、游戏参数、列出主类依赖的jar包等等，启动脚本很长，不适合手打。
2. 管理资源文件，比如声音、语言。
3. 正版登录以及验证。
4. 版本管理。
5. 依赖管理。
6. 额外的功能，比如下载MC、Forge或Optifine，放置新闻...

### MC的目录结构

举个例子：

```
.minecraft/
	assets/
		indexes/                 // 里面有一些以版本号命名的json
		objects/                 // 里面都是乱七八糟的东西
	libraries/                 // 里面是MC运行所依赖的jar包，按照包名建好了一层一层的文件夹
	logs/                      // 顾名思义，都是日志文件 
	resourcepacks/             // 顾名思义，都是资源包，也叫材质包
	saves/                     // 顾名思义，里面放存档
	screenshots/               // 顾名思义，里面放截屏
	versions/                  // 放置不同版本的minecraft主程序
		1.7.2/
			1.7.2.jar              // 1.7.2版本的minecraft主程序
			1.7.2.json             // 列出了所依赖的jar包及其下载地址。这些jar包在libraries中可找到
		1.7.10/
			1.7.10.jar
			1.7.10.json
	options.txt                // minecraft游戏的具体设置，比如鼠标灵敏度、键盘控制等等
	usercache.json             // 玩家信息的缓存，内含游戏名、uuid、最后登陆时间
```

### 启动参数说明

下面这个启动脚本是由HMCL在windows下生成的。我把`\`都换成了`/`

```bat
@echo off
set appdata=F:\MC\Minecraft 1.10.2-Forge\.minecraft
"C:/Program Files/Java/jre1.8.0_73/bin/javaw.exe" 
-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump 
-XX:+UseG1GC 
-XX:-UseAdaptiveSizePolicy 
-XX:-OmitStackTraceInFastThrow 
-Xmn128m 
-Xmx512m 
"-Djava.library.path=F:/MC/Minecraft 1.10.2-Forge/.minecraft/versions/1.10/1.10-natives" 
-Dfml.ignoreInvalidMinecraftCertificates=true 
-Dfml.ignorePatchDiscrepancies=true 
-cp "F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/mojang/netty/1.6/netty-1.6.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/oshi-project/oshi-core/1.1/oshi-core-1.1.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/net/java/dev/jna/jna/3.4.0/jna-3.4.0.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/net/java/dev/jna/platform/3.4.0/platform-3.4.0.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/ibm/icu/icu4j-core-mojang/51.2/icu4j-core-mojang-51.2.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/net/sf/jopt-simple/jopt-simple/4.6/jopt-simple-4.6.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/paulscode/codecjorbis/20101023/codecjorbis-20101023.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/paulscode/codecwav/20101023/codecwav-20101023.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/paulscode/libraryjavasound/20101123/libraryjavasound-20101123.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/paulscode/librarylwjglopenal/20100824/librarylwjglopenal-20100824.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/paulscode/soundsystem/20120107/soundsystem-20120107.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/io/netty/netty-all/4.0.23.Final/netty-all-4.0.23.Final.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/google/guava/guava/17.0/guava-17.0.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/org/apache/commons/commons-lang3/3.3.2/commons-lang3-3.3.2.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/commons-io/commons-io/2.4/commons-io-2.4.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/commons-codec/commons-codec/1.9/commons-codec-1.9.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/net/java/jinput/jinput/2.0.5/jinput-2.0.5.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/net/java/jutils/jutils/1.0.0/jutils-1.0.0.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/google/code/gson/gson/2.2.4/gson-2.2.4.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/mojang/authlib/1.5.22/authlib-1.5.22.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/com/mojang/realms/1.9.0/realms-1.9.0.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/org/apache/commons/commons-compress/1.8.1/commons-compress-1.8.1.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/org/apache/httpcomponents/httpclient/4.3.3/httpclient-4.3.3.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/commons-logging/commons-logging/1.1.3/commons-logging-1.1.3.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/org/apache/httpcomponents/httpcore/4.3.2/httpcore-4.3.2.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/it/unimi/dsi/fastutil/7.0.12_mojang/fastutil-7.0.12_mojang.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/org/apache/logging/log4j/log4j-api/2.0-beta9/log4j-api-2.0-beta9.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/org/apache/logging/log4j/log4j-core/2.0-beta9/log4j-core-2.0-beta9.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/org/lwjgl/lwjgl/lwjgl/2.9.4-nightly-20150209/lwjgl-2.9.4-nightly-20150209.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/libraries/org/lwjgl/lwjgl/lwjgl_util/2.9.4-nightly-20150209/lwjgl_util-2.9.4-nightly-20150209.jar;F:/MC/Minecraft 1.10.2-Forge/.minecraft/versions/1.10/1.10.jar" net.minecraft.client.main.Main 
--username nothing 
--version "HMCL 2.5.1.79" 
--gameDir "F:/MC/Minecraft 1.10.2-Forge/.minecraft" 
--assetsDir "F:/MC/Minecraft 1.10.2-Forge/.minecraft/assets" 
--assetIndex 1.10 
--uuid 3e47b75000b0924b6c9ba5759a7cf15d 
--accessToken 3e47b75000b0924b6c9ba5759a7cf15d 
--userType Legacy 
--versionType "HMCL 2.5.1.79" 
--height 480 
--width 854
```

linux下脚本可能会像这样（我用上面的手改的，因为有些依赖似乎与系统相关，所以不知道还能不能用）。`~`应该换成别的，比如`/home/username`。

```shell
/usr/bin/java
-XX:+UseG1GC 
-XX:-UseAdaptiveSizePolicy 
-XX:-OmitStackTraceInFastThrow 
-Xmn128m
-Xmx1024m 
-Djava.library.path=~/.minecraft/versions/1.10/1.10-natives
-Dfml.ignoreInvalidMinecraftCertificates=true 
-Dfml.ignorePatchDiscrepancies=true 
-cp "~/.minecraft/libraries/com/mojang/netty/1.6/netty-1.6.jar;~/.minecraft/libraries/oshi-project/oshi-core/1.1/oshi-core-1.1.jar;~/.minecraft/libraries/net/java/dev/jna/jna/3.4.0/jna-3.4.0.jar;~/.minecraft/libraries/net/java/dev/jna/platform/3.4.0/platform-3.4.0.jar;~/.minecraft/libraries/com/ibm/icu/icu4j-core-mojang/51.2/icu4j-core-mojang-51.2.jar;~/.minecraft/libraries/net/sf/jopt-simple/jopt-simple/4.6/jopt-simple-4.6.jar;~/.minecraft/libraries/com/paulscode/codecjorbis/20101023/codecjorbis-20101023.jar;~/.minecraft/libraries/com/paulscode/codecwav/20101023/codecwav-20101023.jar;~/.minecraft/libraries/com/paulscode/libraryjavasound/20101123/libraryjavasound-20101123.jar;~/.minecraft/libraries/com/paulscode/librarylwjglopenal/20100824/librarylwjglopenal-20100824.jar;~/.minecraft/libraries/com/paulscode/soundsystem/20120107/soundsystem-20120107.jar;~/.minecraft/libraries/io/netty/netty-all/4.0.23.Final/netty-all-4.0.23.Final.jar;~/.minecraft/libraries/com/google/guava/guava/17.0/guava-17.0.jar;~/.minecraft/libraries/org/apache/commons/commons-lang3/3.3.2/commons-lang3-3.3.2.jar;~/.minecraft/libraries/commons-io/commons-io/2.4/commons-io-2.4.jar;~/.minecraft/libraries/commons-codec/commons-codec/1.9/commons-codec-1.9.jar;~/.minecraft/libraries/net/java/jinput/jinput/2.0.5/jinput-2.0.5.jar;~/.minecraft/libraries/net/java/jutils/jutils/1.0.0/jutils-1.0.0.jar;~/.minecraft/libraries/com/google/code/gson/gson/2.2.4/gson-2.2.4.jar;~/.minecraft/libraries/com/mojang/authlib/1.5.22/authlib-1.5.22.jar;~/.minecraft/libraries/com/mojang/realms/1.9.0/realms-1.9.0.jar;~/.minecraft/libraries/org/apache/commons/commons-compress/1.8.1/commons-compress-1.8.1.jar;~/.minecraft/libraries/org/apache/httpcomponents/httpclient/4.3.3/httpclient-4.3.3.jar;~/.minecraft/libraries/commons-logging/commons-logging/1.1.3/commons-logging-1.1.3.jar;~/.minecraft/libraries/org/apache/httpcomponents/httpcore/4.3.2/httpcore-4.3.2.jar;~/.minecraft/libraries/it/unimi/dsi/fastutil/7.0.12_mojang/fastutil-7.0.12_mojang.jar;~/.minecraft/libraries/org/apache/logging/log4j/log4j-api/2.0-beta9/log4j-api-2.0-beta9.jar;~/.minecraft/libraries/org/apache/logging/log4j/log4j-core/2.0-beta9/log4j-core-2.0-beta9.jar;~/.minecraft/libraries/org/lwjgl/lwjgl/lwjgl/2.9.4-nightly-20150209/lwjgl-2.9.4-nightly-20150209.jar;~/.minecraft/libraries/org/lwjgl/lwjgl/lwjgl_util/2.9.4-nightly-20150209/lwjgl_util-2.9.4-nightly-20150209.jar;~/.minecraft/versions/1.10/1.10.jar" 
net.minecraft.client.main.Main 
--username nth233 
--version "HMCL 2.5.1.79" 
--gameDir "~/.minecraft" 
--assetsDir "~/.minecraft/assets" 
--assetIndex 1.10 
--uuid 3e47b75000b0924b6c9ba5759a7cf15d 
--accessToken 3e47b75000b0924b6c9ba5759a7cf15d 
--userType Legacy 
--versionType "HMCL 2.5.1.79" 
--height 480 
--width 854
```

我们来大致分析一下启动脚本。`/usr/bin/java`是完整的java路径。

然后是一串JVM参数，比如`-Xmn128m`指定了最小内存，`-Xmx1024m`指定了最大内存，`-Djava.library.path=~/.minecraft/versions/1.10/1.10-natives`指明了natives文件夹的位置。`-XmsXXXm`指定了初始堆的大小。不知道开头那三行有什么用...

接下来以`-Dfml`开头的两行是让forge忽略自身文件被修改，否则无法兼容optifine。

接下来是以`-cp`开头的「一行」，很长，列出了所有MC依赖的jar包（其中就包含了声音、领域、twitch等一堆东西）。 可以从MC主程序旁边的那个同名`json`里获得它们的下载地址和应放置的位置。

再接下来的一行`net.minecraft.client.main.Main `是主类。

再接下来的一堆是游戏参数，包括了游戏主目录`.minecraft`的位置、MC版本、uuid、令牌、启动器版本以及游戏窗口的长宽、是否全屏（`--fullscreen`，上面的脚本没有体现）等等。

### 粗略的启动过程

0. 获取java路径、下载MC
1. 根据用户的设置，生成启动脚本
2. 启动MC
3. 还可以监视MC的进程（不是很懂，不是非常确定是不是这个功能）

----

## 具体的尝试过程

先是花了三天时间分析HMCL的源码。不知道为什么，我这里vscode装了java扩展后依然无法使用「转到定义」等功能，于是一些本来应该由IDE/编辑器自动完成的事情变成要我人肉手动完成，十分蛋疼。花了一堆时间解决诸如「`gameDir`是哪个文件夹？」、「`versionDir`是哪个文件夹？」这类问题。我记得我第一天看代码看得差点睡着（事实证明，看别人的代码对我这种菜鸡来说可以算是催眠法宝之一）。在HMCL的代码里绕了三天后，总算是自己搞出了一个启动脚本（人肉编译执行2333）。但是，无论我怎么修改，这个启动脚本都没法启动MC。原因似乎是MC没有下载「完整」（缺少natives文件夹）。好吧，我又花了一个小时左右的时间**手动**下载natives里的内容，**手动**按照包名一层层建文件夹，置入依赖的jar包，然而最终还是没有成功。

自制启动器的尝试到这里算是基本失败了。

但是，我又找到了JMCCC。JMCCC的代码比HMCL的「整洁」，再加上之前阅读HMCL代码的经验，看JMCCC的代码比看HMCL的快多了。由于担心JMCCC的脚本不兼容HMCL的目录结构，所以还得重新下载MC。到这里我已经彻底放弃了，按照JMCCC的代码再做一回人肉编译器，重新下载MC，还不如直接调用JMCCC。

好吧，调用JMCCC。完全按照教程，用java调用JMCCC「自制」了一个启动器（simplelauncher）。先是建立项目，把maven依赖添加到`pom.xml`，复制JMCCC项目`README.md`里面的示例代码，稍微改一改：用几十行代码下载MC，用几行代码启动MC。在eclipse里一运行，居然真的启动了MC的1.7.10版本。然后又尝试了几个版本，屡试不爽。当然这个时候心情自然是非常爽。

编译的时候由于不了解java又踩了一些坑。本来想直接把`class`文件拿来用，但很快我发现我这个启动器需要另一个「启动器的启动器」来启动，实在是滑稽。后来查到可以编译成可执行jar包。于是又往`pom.xml`里面添了几行，编译出可执行jar包。又大致给这个启动器添加几个启动选项后，这个「自制的」simplelauncher终于到了「能用」的层级。不过操作依然非常傻：双击，则默认从`~/.minecraft`启动1.7.10版本。要启动其他版本，或者要下载MC，必须在命令行里面`java -jar sl.jar [ --version ${version} ] [ --download ]`。还是有点蛋疼，不过我已经懒得再改了，也懒得玩MC了。

## 一些链接

[《 Minecraft 》为什么要以启动器的形式启动？](https://www.zhihu.com/question/49997128)

[JMCCC使用教程——Java启动器类库，几行代码下载并启动MC](http://www.MCbbs.net/thread-573154-1-1.html)
[Hello Minecraft! Launcher](https://github.com/huanghongxun/HMCL/)
[JMCCC](https://github.com/to2mbn/JMCCC)
[JMCCC使用教程](https://github.com/yushijinhun/jMCcc.tutorial)
[How can I create an executable JAR with dependencies using Maven?](https://stackoverflow.com/questions/574594/how-can-i-create-an-executable-jar-with-dependencies-using-maven)
[[Why do JVM arguments start with “-D”?](https://stackoverflow.com/questions/44745261/why-do-jvm-arguments-start-with-d)](https://stackoverflow.com/questions/44745261/why-do-jvm-arguments-start-with-d)
[JVM系列三:JVM参数设置、分析](http://www.cnblogs.com/redcreen/archive/2011/05/04/2037057.html)
[Tuning Garbage Collection with the 5.0 Java Virtual Machine](https://www.oracle.com/technetwork/java/gc-tuning-5-138395.html)
[Guide to the Most Important JVM Parameters](https://www.baeldung.com/jvm-parameters)
