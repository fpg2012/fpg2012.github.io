---
title: Adam优化器
date: 2026-03-17
layout: post
comment: true
category: [note]
tag: ["论文笔记", "optimizer", "adam", "ai"]
---

又是一个常常使用，但从来没有深究过原理的技术。最近在了解muon，一并补习了。

## Momentum

$$
v_t = \gamma v_{t-1} + \alpha g_t
$$

$$
\theta_t = \theta_{t-1} - v_t
$$

$g_t$为梯度，$\gamma$类似摩擦系数，$v_t$类似速度。

还可以Nestrov化，大概就是先根据当前动量向前看一步，然后再计算梯度，最后按照上面的式子更新参数。

## Adam

目标函数$\mathcal L(x;\theta)$，参数$\theta$。初始学习率$\alpha$，超参数$\beta_1 = 0.9$，$\beta_2 = 0.999$

迭代过程：

- 计算梯度
  $$
  g_t = \nabla_\theta \mathcal L_t(x;\theta_{t-1})
  $$

- 更新一阶矩估计（动量，或者也可以看作滑动平均）
  $$
  m_t = \beta_1m_{t-1}+(1-\beta_1)g_t
  $$

- 更新二阶矩估计（自适应学习率）
  $$
  v_t = \beta_2v_{t-1}+(1-\beta_2)g^2_t
  $$

- 偏差校正（由于$m_t$和$v_t$初始化为0）
  $$
  \hat m_t = \frac{m_t}{1-\beta_1^t}, \hat v_t = \frac{v_t}{1-\beta_2^t}
  $$

- 更新参数
  $$
  \theta_t = \theta_{t-1} - \alpha \cdot \frac{\hat m_t}{\sqrt{\hat v_t} + \epsilon}
  $$

关键思想：

- 动量（momentum）
  - **目的**：加速收敛，减少梯度震荡。
  - **方法**：计算梯度的一阶矩（指数移动平均），保留历史梯度方向。 $m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t$ 其中 $m_t$ 类似“速度”，**在梯度方向持续时加速，在梯度方向变化时减速**。
- 自适应学习率（RMSProp）
  - **目的**：**为每个参数自动调整学习率**，适应稀疏或非平稳梯度。各个参数的更新量尽量平衡
  - **方法**：计算梯度的二阶矩（平方的指数移动平均），反映梯度幅度的历史变化。 $v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2$ 学习率按 $\frac{1}{\sqrt{v_t} + \epsilon}$ 缩放，梯度大的参数获得更小的更新步长。
- 损失函数缩放常数倍不影响优化轨迹

## AdamW

把正则化放进了Adam。更新参数改为
$$
\theta_t = \theta_{t-1} - \alpha \left(\frac{\hat m_t}{\sqrt{\hat v_t + \epsilon}}+\lambda\theta_{t-1}\right)
$$
动机可以从Adam+L2正则化的loss出发
$$
g_t = \nabla [\mathcal L(\theta_{t-1}) + \frac{\lambda}{2}\|\theta_{t-1}\|^2= \nabla\mathcal L +\lambda \theta_{t-1}
$$
导致更新的时候，衰减项会被$v_t$缩放。因此把衰减项提出来，让他不受学习率缩放。
