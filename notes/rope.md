---
title: rope笔记
date: 2026-03-10
category: [note]
tag: [论文笔记, ai, RoPE]
layout: post
---

RoPE每次都要重新看，每次都记不住，说明之前没体会到灵魂。之前一直不理解高维情况怎么处理的，现在算是理解了。

## 动机

用绝对位置编码的方式，实现相对位置编码。指数函数相乘时，乘变成加，利用这个性质，可以让qk之间乘上之后，位置编码的相乘结果只和相对位置有关。

考虑$\bold x = [x_1, x_2]$，视为复平面上的点$z_x = x_1 + ix_2$。对于位置$m$，乘以旋转因子$e^{im\omega}$。
$$
f(\bold x, m) = \bold x \cdot e^{im\omega}
$$
落实到向量上，就是乘上旋转矩阵：
$$
\bold {\hat q} = \begin{bmatrix}\cos m\omega & -\sin m\omega \\ \sin m\omega & \cos m\omega\end{bmatrix}\bold q
$$
计算$m$、$n$两个位置的qk的点积时：
$$
\bold q\cdot\bold k = q_1k_1 + q_2k_2
$$
对应复数的乘法：
$$
z_qz_k^* = (q_1 + iq_2)(k_1 - ik_2) = (q_1k_1+q_2k_2)+i(q_2k_1-q_1k_2)
$$
所以其实就是
$$
\bold{\hat q}\cdot\bold{\hat k} = \mathrm{Re}[\langle f(\bold q, m), f(\bold k, n)^* \rangle] = \mathrm{Re}[\bold q\bold k^* e^{i(m-n)\omega}]
$$
只和位置差$m-n$有关。$\omega$取个比较小的数，决定了能处理多长的序列。

## 推广

这一思路可以推广到高维向量。

将$\bold x = [x_1, x_2, \dots, x_n]$按照奇偶分为两组，或者说，每两个维度组成一个复数
$$
z_k = x_{2k} + ix_{2k+1}
$$
每个维度使用不同频率的旋转因子：
$$
z_k \to z_k e^{im\omega_k}
$$
$m$表示位置，$k$表示向量中的位置。
$$
\omega_k = \left(\frac{1}{10000}\right)^\frac{2k}{d}
$$
由于$k$表示元素在向量中的位置，所以取值是$[0, \frac{d}{2}]$，小$k$意味着频率低（远处和近处的注意力差不多），大$k$意味着频率高（远处的注意力衰减速度很快），实现不同维度感知不同尺度的相对距离。这里设计来自transformer原文的sinusoial pe。10000是个任意的大数，决定了能区分的最大相对距离（见下一小节）。但是毕竟浮点数精度有限，取特别大也没有多少意义。

对于每一组，都按照上一节的方式处理，向量点积的时候自然就只和位置差有关。

## RoPE能区分的最大相对距离

已知$e^{i\theta} = e^{i\theta + 2\pi}$，因此反推最大距离差$d = m-n$，可得
$$
d\omega = 2\pi
$$
即有
$$
d = \frac{2\pi}{\omega} \ge \frac{2\pi}{\omega_{\text{min}}}
$$
我们知道$\omega_\text{min} = \omega_{d/2} = 10000^{-1}$。因此上一小节中的大数决定了RoPE能感知的最大相对距离。所以模型的context length实际上和这个有一定关联。

## 2D RoPE

把特征的维度$d$继续等分，对于位置$(x,y)$，前$d/2$维度按照$x$的位置旋转，后$d/2$维度按照$y$的位置旋转。以此实现一个位置$(x, y)$上对应唯一的位置编码。
