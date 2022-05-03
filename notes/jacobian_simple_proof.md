---
layout: post
title: 'Jacobian Matrix笔记'
tag: [math, 雅可比矩阵]
category: [note]
description: "之前学高数的时候最怕的就是用雅可比矩阵〔Jacobian Matrix〕，只觉得形式难记，意义也不明。根本原因就是学的时候*自己没有推*，老师也没有细讲，作业也不怎么需要泳道，于是稀里糊涂就过去了。复习的时候发现只要推一下就不难，不推则永远没法搞懂。"
comment: true
date: "2022-05-03"
---

之前学高数的时候最怕的就是用雅可比矩阵〔Jacobian Matrix〕，当时只觉得形式难记，意义也不明。根本原因就是学的时候*自己没有推*，老师也没有细讲，作业也不怎么需要用，于是稀里糊涂就过去了。

复习的时候发现只要推一下就不难，不推则永远没法搞懂。

## 隐函数求导

完整地说是「隐函数存在定理」。对于函数下面方程组确定的隐函数

$$
\begin{cases}
F(x,y,u,v) = 0 \\
G(x,y,u,v) = 0
\end{cases}
$$

如果$F$和$G$在$(x_0, y_0, u_0, v_0)$处连续可微，雅可比行列式$J \ne 0$，那么在这个邻域唯一确定了$u = u(x,y)$和$v = v(x,y)$，只是没有明写出来而已。同时可以得到一系列偏导数的，比如$u_x$。

$$
J = 
\begin{vmatrix}
F_u & F_v \\ G_u & G_v
\end{vmatrix}
$$

那么怎么推呢？定理的前半部分，即“确定隐函数”，在这里不证明（可以先利用单调性，证明双变量的隐函数存在定理，然后用数学归纳法，暂时没看懂怎么归纳）。和计算偏导数相关的部分在这里推导。

对$x$求偏导

$$
\begin{cases}
F_uu_x + F_vv_x = -F_x \\
G_uu_x + G_vv_x = -G_x
\end{cases}
$$

根据克莱姆〔Crame〕法则，可以解这个线性方程组，得到

$$
\begin{cases}
u_x = \frac{1}{J}\begin{vmatrix}-F_x & F_v \\ -G_x & G_v\end{vmatrix} \\
v_x = \frac{1}{J}\begin{vmatrix}F_u & -F_x \\ G_u & -G_x\end{vmatrix}
\end{cases}
$$

如果引入记号

$$
\frac{\partial (F, G)}{\partial (x, y)} = \begin{vmatrix}F_x & F_y \\ G_x & G_y\end{vmatrix}
$$

那么就得到了我们熟悉的结论。

$$
\begin{cases}
u_x = -\frac{1}{J}\frac{\partial (F, G)}{\partial (x, v)} \\ 
v_x = -\frac{1}{J}\frac{\partial (F, G)}{\partial (u, x)}
\end{cases}
$$

同理可以得到$u_y$和$v_y$。

## 重积分换元

$$
\iint_C F(x, y) \ \mathrm{d}x\mathrm{d} y
$$

如果有

$$
\begin{cases}
x = \phi (u, v) \\
y = \psi (u, v)
\end{cases}
$$

那么可以换元（先不细究换元的条件）

$$
\iint_{C'} F(x, y) \left|\frac{\partial (x, y)}{\partial (u, v)}\right| \ \mathrm{d}u\mathrm{d} v
$$

又出现了雅可比式。证明需要引入叉积。

如果考虑微分的方向，面积元$dxdy$实际上是$|\vec {dx} \times \vec {dy}|$

接下来就是要考察换元之后面积元发生了什么变化。

$$
\begin{aligned}
\vec {dx} \times \vec {dy} & = (x_u \vec {du} + x_v \vec{dv}) \times (y_u \vec {du} + y_v \vec{dv}) \\
& = x_uy_v \vec{du}\times \vec{dv} + x_vy_u \vec{du}\times \vec{dv} \\
& = \begin{vmatrix}x_u & x_b \\ y_u & y_v\end{vmatrix} \vec{du}\times \vec{dv} \\
& = \frac{\partial (x, y)}{\partial (u, v)}\vec{du}\times \vec{dv}
\end{aligned}
$$

上面的推导说明，面积元的变化和雅可比式相关。

