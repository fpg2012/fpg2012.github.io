---
title: ELBO变分下界
category: [note]
tag: ["论文笔记", "ELBO", "VAE", "diff_series"]
comment: true
description: ELBO的推导
date: 2025-06-01
layout: post
---

## 预备知识

### 带隐变量的最大似然估计

假设有两个随机变量$\bold z$和$\bold x$，二者存在相关性，显变量$\bold x$能够被观测到，隐变量$\bold z$无法被观测到。我们希望能够用一参数为$\theta$的模型来表达它们的关系。

通过实验，独立同分布地采集数据，得到数据集$\{\bold x_i\}$，可以最大化似然函数$\mathcal L(\theta)$优化这一模型（让样本出现概率尽可能大）。

$$
\mathcal L (\theta) = -\sum \log p_\theta(\bold x_i)
$$

然而由于模型中隐变量的存在，$p(\bold x_i)$不可求。根据全概率公式，有下面的结果。这一积分一般情况下无法直接求解。

$$
p(\bold x_i) = \int p(\bold x_i|\bold z) \mathrm d\bold z
$$

### Jensen不等式

对于凸函数$f(x)$，随机变量$X$，有

$$
f(\mathbb E[X]) \le \mathbb E[f(X)]
$$

对于凹函数，则反过来。

### KL散度

KL散度衡量两个概率分布的差异。

$$
\mathrm{KL}(q(x) || p(x)) \triangleq \int q(x)\log \frac{q(x)}{p(x)}\mathrm{d}x
$$

两个分布相等的时候，KL散度为0。可以用Jensen不等式证明KL散度是非负的。

从信息论的角度看，KL散度反映了用$p(x)$取代$q(x)$所损失的信息量。

$$
\int q(x)\log \frac{q(x)}{p(x)}\mathrm{d}x = - \int q(x)\log p(x)\mathrm{d}x - \left[-\int q(x)\log q(x)\mathrm{d}x\right]
$$

第一项是互信息，第二项是$q(x)$的信息。KL散度不是对称的，所以叫做“散度”（divergence）而不是“距离”（distance）。

## 引入变分分布

引入一个变分函数$q_\phi(\bold z | \bold x)$，意义是估计隐变量$\bold z$。这个函数应该和真实的$p(\bold z| \bold x)$尽量接近，也就是最小化二者的KL散度$\mathrm{KL}(q_\phi(\bold z|\bold x) || p_\theta(\bold z|\bold x))$。

### 最大化似然函数

回到似然函数上

$$
\begin{aligned}
\log p_\theta(\bold x) =& \log \int p(\bold x|\bold z)p(\bold z) \mathrm d\bold z \\
=& \log \int q(\bold z| \bold x) \frac{p(\bold x | \bold z)p(\bold z)}{q(\bold z|\bold x)}\mathrm{d} \bold z \\
=& \log \mathbb E_{\bold z \sim q(\bold z|\bold x)}\left[\frac{p(\bold x | \bold z)p(\bold z)}{q(\bold z|\bold x)}\right] \\
\ge&\ \mathbb E_{\bold z \sim q(\bold z|\bold x)}\left[ \log \frac{p(\bold x | \bold z)p(\bold z)}{q(\bold z|\bold x)}\right] \\
\triangleq& \  \mathrm{ELBO}
\end{aligned}
$$

最大化ELBO就是在最大化似然函数。

### 最小化KL散度

$$
\begin{aligned}
&\mathrm{KL}(q(\bold z|\bold x) || p(\bold z|\bold x))\\
=& \int q(\bold z | \bold x)\log \frac{q(\bold z | \bold x)}{p(\bold z | \bold x)} \mathrm{d}\bold z \\
=&\ \mathbb E_{\bold z \sim q(\bold z| \bold x)} \left[ \log \frac{q(\bold z | \bold x)}{p(\bold z | \bold x)} \right] \\
=&\ \mathbb E_{\bold z \sim q(\bold z| \bold x)} \left[ \log \frac{q(\bold z | \bold x)}{p(\bold z | \bold x)p(\bold x) } + \log p(\bold x) \right] \\
=& \mathbb E_{\bold z \sim q(\bold z| \bold x)} \left[ \log \frac{q(\bold z | \bold x)}{p(\bold x | \bold z)p(\bold z) } \right] + \log p(\bold x)
\end{aligned}
$$

至此，我们已经得到了类似上一小节的结果。移项一下，就能得到

$$
\log p(\bold x) = \mathrm{KL} - \mathbb E_{\bold z \sim q(\bold z| \bold x)} \left[ \log \frac{q(\bold z | \bold x)}{p(\bold x | \bold z)p(\bold z) }\right] = \mathrm{KL} + \mathrm{ELBO}
$$

对于$q_\phi$来说，$p(\bold x)$和它无关，所以最大化ELBO就是最小化KL。

## 优化

用小批量的随机梯度下降法（梯度上升法）来求解，ELBO里面的期望可以通过采样来计算。不需要交替优化$\theta$和$\phi$，可以让它们协同训练。

当碰到类似问题的时候，比如最大似然估计的同时还要估计隐变量，就应该想到ELBO。

## ELBO的进一步解释

把ELBO拆开，可以得到两项，一项是重构损失，一项是正则化项。
