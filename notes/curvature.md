---
layout: post
title: 曲率相关
tag: [note, math， 曲率]
category: [note]
comment: true
date: 2022-10-09
---

## 定义

$$
K = \left|\frac{d\alpha}{dr}\right|
$$

$$
\rho = 1/K
$$

## 计算

>  下面暂时省略绝对值

$$
\begin{aligned}
K &= \frac{d\arctan y'}{\sqrt{dx^2 + dy^2}} 
= \frac{\frac{y''}{1+(y')^2}dx}{dx\sqrt{1+(y')^2}} \\
& = \frac{y''}{\left[1+(y')^2\right]^{3/2}}
\end{aligned}
$$

如果由参数方程确定

$$
\begin{cases}
x = \phi (t) \\
y = \psi(t)
\end{cases}
$$

那么有

$$
\begin{aligned}
K &= \frac{ \frac{d}{dx}\left( \frac{dy}{dx} \right) }{\left[1 + (\frac{dy}{dx})^2 \right]^{3/2} } \\
& = \frac{ \frac{d}{dt}\left( \frac{\psi'(t)}{\phi'(t)} \right)\frac{1}{\phi'(t)} }{\left[1 + (\frac{\psi'(t)}{\phi'(t)})^2 \right]^{3/2} } \\
& = \frac{ \frac{\phi'(t)\psi''(t) - \psi'(t) - \phi''(t)}{\phi'^3(t)}}{\left[1 + (\frac{\psi'(t)}{\phi'(t)})^2 \right]^{3/2} } \\ 
& = \frac{\phi'(t)\psi''(t) - \psi'(t) - \phi''(t)}{\left(\phi'^2(t) + \psi'^2(t)\right)^{3/2} }
\end{aligned}
$$
