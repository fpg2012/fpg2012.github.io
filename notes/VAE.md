---
title: VAE的推导
category: [note]
tag: ["论文笔记", "VAE", "diff_series"]
comment: true
description: ELBO的推导
date: 2025-06-02
layout: post
---

# VAE

## 前置知识

根据之前对[ELBO的推导](./ELBO.html)，我们知道最大化ELBO可以同时最大化对数似然函数，最小化KL散度。

$$
\mathbb E_{\bold z \sim q(\bold z|\bold x)}\left[ \log \frac{p(\bold x | \bold z)p(\bold z)}{q(\bold z|\bold x)}\right]
$$

ELBO可以拆开：

$$
\mathbb E_{\bold z \sim q(\bold z|\bold x)}\left[ \log p(\bold x | \bold z) \right] - \mathrm{KL} (q(\bold z|\bold x) || p(\bold z))
$$

第一项是重构项，衡量$\bold x$重构的质量。第二项是正则化，让策略不要变化太剧烈，不要和先验差别太大，确保训练比较稳定。

但是要落实到实践中，光有这个式子还不够。

## VAE的做法

一，假设$\bold z$的先验分布是标准高斯分布。

二，用神经网络描述$p_\theta(\bold x|\bold z)$和$q_\phi(\bold z | \bold x)$。如何用神经网络描述分布？我们假设$q_\phi(\bold z|\bold x)$是高斯分布。高斯分布可以完全用二阶矩来描述，我们再假设$\bold z$的每个维度都是独立的，那么就可以通过一个网络预测$\bold z$分布的均值和方差

$$
[\mu, \sigma] = \mathrm{MLP}_\phi(\bold x)
$$

然后从高斯分布$\mathcal {N} (\mu, \Sigma)$中采样$\bold z$。（各个维度独立，所以$\Sigma$是对角矩阵，对角上就是$\sigma$）。我们假设$\bold z$的每个维度独立，其实并没有任何损失，因为对于高斯分布来说，独立等价于不相关，等价于各个维度没有线性关系。如果考虑不独立的情形，也不过是再加一层线性变换罢了。

采样得到$\bold z$之后，我们用另一个网络预测$\bold x$。

三，损失函数的进一步简化。对于高斯分布来说，KL散度可以解析地写出来。重构项可以用MSE代替，对于分割也可以用交叉熵代替。用MSE相当于假设$\bold x$是高斯分布，用交叉熵隐含了伯努利分布，可以参考苏剑林的博客。

四，重参数化技巧。“重参数化”听着很高大上，其实就是把采样$\bold z$的过程，重写成从标准高斯中采样，然后再变换到所需的分布，这点也是高斯分布的性质决定的（高斯分布的线性组合还是高斯分布，只不过均值和方差会发生改变，所有高斯分布都可以线性变换一下“标准化”回标准高斯分布。操作很简单，但是却很必要，因为直接采样$\bold z$，会导致$\mu$和$\sigma$都没有梯度，重参数化之后，$\mu$和$\sigma$就有梯度了，没梯度的只剩下“从标准高斯分布采样”这个操作，。
