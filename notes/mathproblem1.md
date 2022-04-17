---
layout: post
title: "一道积分：利用分部积分和三角换元"
date: "2022-04-16"
description: "利用分部积分和三角换元，也许是硬算"
tag: [math, "积分"]
category: [other]
---

求积分

$$
\int \frac{x\ln(x+\sqrt{1+x^2})}{(1+x^2)^2}dx
$$

---

解：

$$
\begin{aligned}
& \int \frac{x\ln(x+\sqrt{1+x^2})}{(1+x^2)^2}dx \\
= & \int\frac{\ln(x+\sqrt{1+x^2})}{2(1+x^2)^2}d(x^2)\\
= &\int\frac{\ln(x+\sqrt{1+x^2})}{2(1+x^2)^2}d(x^2+1) \\
= & -\frac{1}{2}\int \ln(x+\sqrt{1+x^2})d\left(\frac{1}{1+x^2} \right) \\
= & -\ln(x+\sqrt{1+x^2})\cdot \frac{1}{1+x^2}
 + \frac{1}{2}\int \frac{1}{1+x^2}\cdot \frac{1+\frac{x}{\sqrt{1+x^2}}}{1+\sqrt{1+x^2}}dx \\
= & -\frac{1}{2}\frac{\ln(x+\sqrt{1+x^2})}{1+x^2}
+ \frac{1}{2}\int \frac{1}{(1+x^2)^{\frac{3}{2}}}dx
\end{aligned} 
$$

另解 $\int \frac{1}{(1+x^2)^{\frac{3}{2}}}dx$

$$
\begin{aligned}
& \int \frac{1}{(1+x^2)^{\frac{3}{2}}}dx \\
=& \int \frac{1}{(1+\tan^2\theta)^{\frac{3}{2}}} d\tan\theta \\
\overset{x = \tan\theta}{=} & \int \frac{1}{\sec^3\theta}\sec^2 \theta d\theta
= \int \cos\theta d\theta \\
=& \sin\theta
\end{aligned} 
$$

有

$$
\begin{aligned}
x^2 = \frac{\sin^2\theta}{1-\sin^2\theta}
\Leftrightarrow x^2 -x^2\sin^2\theta - \sin^2\theta = 0 \Leftrightarrow \sin^2\theta = \frac{x^2}{1+x^2}
\end{aligned}
$$

故（可能需要分类讨论？）

$$
\sin\theta = \frac{x}{\sqrt{1+x^2}}
$$

得原积分

$$
-\frac{1}{2}\frac{\ln(x+\sqrt{1+x^2})}{1+x^2} + \frac{x}{2\sqrt{1+x^2}}
$$






























