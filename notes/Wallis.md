---
layout: post
title: Wallis公式
description: 
tag: [note, math， 积分, Wallis]
category: [note]
comment: true
date: 2022-09-22
---

## 定义

$$
S_n = \int_0^{\pi/2} \sin^n x dx
$$

## 结论

$$
\begin{aligned}
& S_n = \frac{n-1}{n}S_{n-2} \\
& S_0 = \frac{\pi}{2} \\
& S_1 = 1
\end{aligned}
$$

另外注意

$$
S_n = \int_0^{\pi/2} \sin^n x dx = \int_0^{\pi/2} \cos^n x dx
$$

## 推导

主要使用分部积分。$S_0$和$S_1$的计算这里省略。

另外可以注意，改变$S_n$的定义为余弦的积分，结论依然成立。

$$
\begin{aligned}
S_n &= \int_0^{\pi/2} \sin^n x dx  \\ 
= & -\int_0^{\pi/2} \sin^{n-1} x d\cos x \\
= & -\left[\left. \sin^{n-1} x\cos x\right|_0^{\pi/2} - \int_0^{\pi/2}\cos x d\sin^{n-1} x\right] \\
= & \int_0^{\pi/2}\cos^2 x (n-1)\sin^{n-2} x dx \\
= & \int_0^{\pi/2}(1-\sin^2 x)(n-1)\sin^{n-2} x dx \\
= & (n-1)\int_0^{\pi/2}\sin^{n-2}xdx - (n-1)\int_0^{\pi/2} \sin^n xdx \\
= & (n-1)S_{n-2} - (n-1)S_n \\ 
\Rightarrow & S_n = \frac{n-1}{n}S_{n-2}
\end{aligned}
$$
