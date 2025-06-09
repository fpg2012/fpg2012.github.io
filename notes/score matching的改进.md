---
title: Score Matching的改进
category: [note]
tag: ["论文笔记", "Score Matching", "NCSB", "Diffusion Model", "diff_series"]
comment: true
description: Score Matching的改进
date: 2025-06-05
layout: post
---

## 朴素的Score Matching存在的问题

Score Matching通过优化以下目标，用一个模型$s_\theta(x)$拟合真实分布对样本的对数梯度$\nabla_x \log p(x)$，也就是score函数$s(x)$

$$
J(\theta) = \mathbb E_{x \sim p(x)} \left[∥s_\theta(x)∥^2 - 2\nabla_x s_\theta(x)\right]
$$

通过模拟Langevin方程，我们无需知道具体的概率密度，就能从中采样。既然这套方法可以建模概率分布，就能用来做生成模型。

但由于本质上score matching的优化目标是最小化MSE

$$
J(\theta) = \mathbb E_{x_\sim p_\text{data}(x)} ∥ s_\theta(x) -  \nabla_x\log p_{\text{data}}(x)∥^2
$$

对于$p(x)$较大的区域，这一损失较为准确，但对于$p(x)$较小的区域，损失较小，建模不准确。

## Noise Conditional Score-Based Model

NCSB的方法就是，用高斯噪声$\epsilon \sim \mathcal N(0, \sigma^2)$干扰输入样本，这样我们采样的分布就从原始的$p(x)$变成了$p_\sigma(x)$。高斯噪声让$p_\sigma(x)$比$p(x)$更加“平均”，噪声越大，就越“平均”，这样就能缓解$p(x)$在小概率区域建模不够精确的问题。

但是score matching的对象从几乎无噪声的原始分布，变成了带噪声的分布。我们肯定不想学习一个噪声很大的分布。噪声太小，无法有效缓解建模不精确的问题，噪声太大，学出来的东西又没有用。

于是NCSB的方法就是，准备一系列噪声，方差为$\sigma_0, \sigma_1, \dots, \sigma_T$. 其中$\sigma_0$特别小，以至于$p_{\sigma_0} (x)$和$p(x)$基本一样。$\sigma_T$特别大，以至于噪声比原始分布要大，$p_{\sigma_T}(x) \approx \mathcal N(0, \sigma_T^2)$

模型拟合的函数从$s_\theta(x)$变成了$s_\theta(x, i)$

对于每个$i$，要优化

$$
J_i(\theta) = \mathbb E_{x_\sim p_{\sigma_i}(x)} ∥ s_\theta(x) -  \nabla_x\log p_{\sigma_i}(x)∥^2
$$

最终的目标就是各个$i$的加权平均，权重$\lambda_i$可以直接取$\sigma_i$

$$
J(\theta) = \sum_i \lambda_i J_i(\theta) =  \sum_i \sigma_i J_i(\theta)
$$

那么如何采样呢？先初始化一个样本，按朗之万动力学模拟噪声较大的分布，然后逐渐减小噪声，退火到原始分布上。大噪声的低概率区域是较为准确的，小噪声的更接近原始分布。这样我们就能避免样本困在模拟不准确的低概率区域。

###  噪声的选取和模型的选择

噪声选择指数增长的序列，模型用UNet，就能在图像生成任务上取得还不错的结果。

## Ref

https://yang-song.net/blog/2021/score/
