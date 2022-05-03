---
title: "高数（下）笔记"
description: "记录高数的一些概念、解法和证明"
date: "2020-02-26"
layout: post
category: [note]
tag:
  - math
  - 笔记
  - 数学
---

>  很久以前的笔记，现在为了复习更新上来（2022-05-03）

## 空间解析几何

### 平面、直线的方程

1.  已知在平面里的三点，要求平面方程
    1.  设一般方程，暴力解方程组
    2.  $\overrightarrow{AB}\times \overrightarrow{BC}$，得到法向量

2.  已知直线的一般方程，求参数方程
    1.  两个平面的法向量叉乘就是其方向向量。得到方向向量与其上一点，就可以列出对称式方程，从而得到参数方程。
    2.  暴力。对方程组进行变形，写出对称式方程，然后写出参数式方程。

3.  点到平面的距离
    $$
    d=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}
    $$

4.  两直线的夹角

    方向向量的夹角余弦值
    $$
    \cos{\alpha}=\frac{|m_1m_2+n_1n_2+p_1p_2|}{\sqrt{m_1^2+n_1^2+p_1^2}\cdot\sqrt{m_2^2+n_2^2+p_2^2}}
    $$

5.  直线与平面的夹角

    等于方向向量与法向量的夹角

    直线与平面的关系，其实就是考察法向量和方向向量的关系。

### 曲面方程

#### 旋转曲面

有以曲线$F(x, y)=0$，绕$x$轴旋转，得到
$$
F(x, \sqrt{y^2+z^2})
$$

>   绕哪个轴旋转，哪个轴就不变

1.  旋转椭球面
2.  圆锥面

#### 柱面

简单

#### 二次曲面

1.  椭球面
    $$
    \frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}=1
    $$

2.  椭圆抛物面
    $$
    \frac{x^2}{2p}+\frac{y^2}{2q}=z
    $$

3.  马鞍面（双曲抛物面）
    $$
    -\frac{x^2}{2p}+\frac{y^2}{2q}=z
    $$

4.  单叶双曲面
    $$
    \frac{x^2}{a^2}+\frac{y^2}{b^2}-\frac{z^2}{c^2}=1
    $$

5.  双叶双曲面
    $$
    \frac{x^2}{a^2}+\frac{y^2}{b^2}-\frac{z^2}{c^2}=-1
    $$

6.  二次锥面
    $$
    \frac{x^2}{a^2}+\frac{y^2}{b^2}-\frac{z^2}{c^2}=0
    $$

#### 空间曲线的方程

1.  一般方程：两个曲面相交得到
2.  参数方程

## 多元函数微分学

>   类比

### 点

1. 内点：存在$\delta > 0$、$P_0\in \mathbb{R^2}$使$U(P_0, \delta)\subset\mathbb{R^2}$，则$P_0$是内点
2. 边界点和外点：类比上面的定义。

### 点集

1.  开集：没有边界点，全是内点
2.  闭集：开集的余集（$R^2-D$）成为闭集
3.  区域：联通的点集

### 二元函数的极限

$P\to P_0$有无穷条路径

>   经典例子：
>   $$
>   \lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}
>   $$
>
>   $$
>   \lim_{x\to 0, y\to 0}\frac{xy^2}{x^2+y^2}
>   $$
>
>   $$
>   \lim_{(x,y)\to (0,0)}\frac{x^y}{x^4+y^2}
>   $$

累次极限存在，不代表二重极限一定存在；二重极限存在，也不代表累次极限存在。但是如果它们都存在，则必然相等。

二元函数求极限的方法：

1.  等价无穷小替换
2.  换元
3.  夹逼

#### 闭区域上连续函数的性质

有界性、最值定理、介值定理

### 偏导数

只留一个变量动，把其他变量都固定，对动的变量求导，得到偏导数。

>   这个符号$\partial$可以读作partial

偏导数记号，一般应视作整体，$\displaystyle \frac{\partial f}{\partial x}$和$\displaystyle \frac{\partial f}{\partial y}$的分母实际上是不同的，但是记号却是一样的。

可偏导未必连续，连续未必可偏导。

#### 高阶/混合偏导数

Clairaut定理：两个二阶混合偏导数的求导顺序不同，不一定相等。但是如果两个二阶混合偏导数都在区域$D$内连续，二者则相等。

>   我好像也没那么蠢

>   Laplace算子$\Delta r = \frac{\partial^2 r}{\partial x^2} + \frac{\partial^2 r}{\partial y^2} + \frac{\partial^2 r}{\partial z^2}$

### 全微分

$z=f(x,y)$，全微分$dz=\frac{\partial z}{\partial x}dx + \frac{\partial z}{\partial y}dy$

在区域$D$中每一点都存在全微分，则$f$是$D$内的可微函数

可微必连续、必可偏导。

#### 可微的必要条件和充分条件

1. 必要条件

    1. $f(x,y)$在这点续
    2. 偏导数在这点存在

2. 充分条件

    偏导数在这点的某邻域内存在，且在这点连续。

>   利用全微分进行近似计算，比如计算$1.04^{1.98}$
>
>   设$z = x^y$， $(x_0,y_0)=(1, 2)$
>
>   
>   $$
>   f(x,y)-f(x_0,y_0)\approx f_x(x_0,y_0)\Delta x+f_y(x_0,y_0)\Delta y
>   $$

>   一阶微分的不变性为凑微分提供依据。
>
>   和一阶微分一样，一阶全微分也具有不变性：
>
>   $f = f(u, v)$，$u=u(x,y)$，$v=v(x,y)$，那么
>   $$
>   df = \frac{\partial f}{\partial u}du+\frac{\partial f}{\partial v}dv = \frac{\partial f}{\partial u}{(\frac{\partial u}{\partial x}x+\frac{\partial u}{\partial y}y)}+\frac{\partial f}{\partial v}{(\frac{\partial v}{\partial x}x+\frac{\partial v}{\partial y}y)}
>   $$

#### 多元函数链法则

![image-20200318102540421](%E9%AB%98%E6%95%B0%EF%BC%88%E4%B8%8B%EF%BC%89%E7%AC%94%E8%AE%B0/image-20200318102540421.png)

>   证明思路：
>
>   利用全微分知识：$\Delta_x z=f_u\Delta_x u+f_v\Delta_x v+o(\rho)$，两边除以$\Delta x$，求极限，就得到链法则。 

#### 隐函数的偏导数

两边求偏导，嗯，就这样。

##### 隐函数组的偏导数

>    其实就是tm就是解方程组。

考虑方程组

$$\left\{\begin{aligned}& P(x,y,u,v)\\&Q(x,y,u,v)\end{aligned}\right.$$

把四个变量中的两个作为自变量，就确定出两个两元函数，作为一个两元隐函数。

然后教材上列出Jacobi式，莫名奇妙出现一堆行列式。其实tm就是解方程组，Cramer法则用用罢了。看着怪吓人的。

>   过后我重新审视了一下Jacobi的方法，感觉也没有那么复杂难记，其实只要用心看看下面这组公式就明白了。
>
>   隐函数组
>   
>
>   $$
>   \begin{cases}
>   F(u, v, x, y) = 0 \\\
>   G(u, v, x, y) = 0
>   \end{cases}
>   $$
>   
>
>   $$
>   J = \frac{\partial(F, G)}{\partial(u, v)} = \begin{vmatrix}F_x & F_v \\\\ G_x & G_y\end{vmatrix}
>   $$
>
>   $$
>   \frac{\partial u}{\partial x} = -\frac{1}{J}\frac{\partial(F, G)}{\partial(x, v)}
>   $$
>
>   $$
>   \frac{\partial u}{\partial y} = -\frac{1}{J}\frac{\partial(F, G)}{\partial(y, v)}
>   $$
>
>   $$
>   \frac{\partial v}{\partial x} = -\frac{1}{J}\frac{\partial(F, G)}{\partial(u, x)}
>   $$
>
>   $$
>   \frac{\partial v}{\partial y} = -\frac{1}{J}\frac{\partial(F, G)}{\partial(u, y)}
>   $$

> 隐函数存在定理
>
> $J$在某点处不等于0，则在这点可以确定唯一的单值函数。

#### 方向导数和梯度

实际上还是把多元问题变成一元问题。设有一个向量$\boldsymbol{l}$，有一个函数$z=f(x,y)$，那么这个函数$P_0(x_0,y_0)$处$\boldsymbol{l}$方向的导数记为：

$$
\left.\frac{\partial z}{\partial\boldsymbol{l}}\right|_{P_0} = \lim_{\rho\to 0}\frac{f(x_0+\Delta x, y_0 + \Delta y)}{\rho} \ \left(\rho = \sqrt{\Delta x^2 + \Delta y^2}\right)
$$

如果在这点可微，则：

$$
\left.\frac{\partial z}{\partial\boldsymbol{l}}\right|_{P_0} = f_x(x_0,y_0)\cos\alpha + f_y(x_0,y_0)\cos \beta
$$

>   就是梯度点乘了$\vec l$的方向余弦。
>
>   证明利用了$\Delta x/\rho = \cos\alpha$，$\Delta y/\rho = \cos\beta$

从上面的式子可以看出，如果$\vec l = \{f_x(x_0,y_0),f_y(x_0,y_0)\}$，刚好让方向导数最大！

这个方向就是**梯度**。

>   梯度记为$\nabla x$或者$\mathrm{grad}z$，$\nabla$是nabla算子

#### 求曲线/曲面的切、法

### 曲线的切线和法平面

用参数方程，或者也可以用全导数 ~~（Jacobi式令人死亡）#tuxie~~

切线的方向向量就是法平面的法向量。

### 曲面的法向量和切平面

> 总是忘记法向量的计算方法，所以这次回来重新审视和理解一下法向量是怎么算的。**感觉很巧妙**

设曲面方程为$F(x,y,z)=0$

那么求法向量的核心就是全导数公式。

$$
\frac{dF}{dt} = \frac{\partial F}{\partial x}\frac{d x}{d t} + \frac{\partial F}{\partial y}\frac{d y}{d t} + \frac{\partial F}{\partial z}\frac{d y}{d z} = 0
$$

其中

$$
\left\{
\begin{aligned}
& x = x(t) \\
& y = y(t) \\ 
& z = z(t)
\end{aligned}
\right.
$$

是经过某点$P_0$的曲面上的曲线

上式恰好可以看成曲线在$P_0$切向量于另一个向量的点成，而由于曲线是一般的，所以“另一个向量”就是要找的法向量。

$\vec v = \left\{ \frac{\partial F}{\partial x}, \frac{\partial F}{\partial y}, \frac{\partial F}{\partial z} \right\}$

#### 二元函数Taylor公式

本质上是参数方程+链法则。

考虑$z=f(x,y)$，我们主要考虑$x$和$y$在这里变一点点，$z$怎么变，最大限度地模拟它的变化。比如给$x$一个变化$a$，给$y$一个变化$b$，想知道$f(x+a,y+b)$是多少。

很自然地，考虑这个$(a,b)$这个方向的方向导数。设$\phi(t) = f(x_0 + at, y_0+bt)$

根据一元函数的Maclauring公式

$$
\phi(t) = \sum_{k=0}^{n} \frac{\phi^{(n)}(0)}{k!}t^k + R_n(t)
$$

可以知道

$$
f(x+a, y+b) = \phi(1) = \sum_{k=0}^{n}\frac{\phi^{(n)}(1)}{k!} + R_n
$$

$\phi^{(n)}(t)$实际上就是在$f(x,y)$在$(a, b)$个方向上的$n$阶导数，可以证明：
$$
\phi^{(n)}(t) = \left(a\frac{\partial}{\partial x} + b\frac{\partial}{\partial y}\right)^nf(x_0+at, y_0+bt)
$$

>   证明可以使用数学归纳法

嘿，那么直接代入就可以得到：
$$
f(x+a,y+b) = \sum_{k=0}^n\frac{1}{k!}\left(a\frac{\partial}{\partial x} + b\frac{\partial}{\partial y}\right)^kf(x_0, y_0) + R_n
$$
这就是多元函数的Taylor公式！

其中Lagrange余项$R_n$如下（$t=1$，所以没有$t^{n+1}$这个因式）：
$$
R_n = \frac{\phi^{(n+1)}(\xi)}{(n+1)!} = \frac{1}{(n+1)!}\left(a\frac{\partial}{\partial x} + b\frac{\partial}{\partial y}\right)^{n+1}\cdot f(x_0+a\xi, y_0+b\xi) \ (0\le\xi\le1)
$$
也可以写成Peano余项$o(\rho^n)$，$\rho = \sqrt{a^2 + b^2}$

#### 求极值

思想很简单，就是找出**驻点**，再判断是不是比周围都高/低。

极值存在的充分条件需要注意，似乎就是考虑各个方向的二阶方向导数，只不过为了方便证明借助了Taylor公式

在$(x_0,y_0)$的邻域有连续的二阶偏导数，记Heissian矩阵为

$$
H_f = \begin{vmatrix}
f_{xx} & f_{xy} \\
f_{yx} & f_{yy}
\end{vmatrix}
$$

1.  若$H_f$**正定**，即其行列式大于0且$f_{xx} > 0$，这点是极**小**值点
2.  若$H_f$**负定**，即其行列式大于0且$f_{xx}<0$，这点是极**大**值点
3.  如果$|H_f| < 0$，不是极值点
4.  如果$|H_f| = 0$，另作讨论，再说

#### 条件极值

碰到不能转化为非条件极值的极值问题，可以使用Lagrange乘数法。证明不想看。方法如下：

设$\phi(x,y)$和$\psi(x,y)$是约束条件，要求极值的函数是$z = f(x,y)$

1.  构造Lagrange函数$L(x,y,z,\lambda,\mu) = f(x,z,y) + \lambda \phi(x,y)+\mu\psi(x,y)$
2.  Lagrange函数分别对每个变量求偏导数，令每个偏导数都等于0，就能得到一个方程组
3.  解出来就完了:fu:（还要验证）​

>   居然在经济学的书上面看到了Lagrange乘数法，看来还是在最优化问题中还是挺有用的。

## 多元函数积分学

### 二重积分

记号、定义、线性、可加性、估值公式此不再赘述，具体看书，类比一元的情况。

>    二重积分也有中值定理：
>
>   函数$f(x,y)$在闭区域$D$上连续，则存在一点$(\xi, \eta)\in D$，使
>   $$
>   \iint_D f(x,y)d\sigma = f(\xi, \eta)\sigma
>   $$
>   即
>   $$
>   \frac{1}{\sigma}\iint_D f(x,y)d\sigma = f(\xi, \eta)
>   $$

#### 二重积分的计算

##### 直角坐标

基本思想就是化成**累次积分**。

二重积分的几何意义是以某个区域为底的曲顶柱体的体积，如果把这个柱体切成很多薄片，每个薄片的面积就是一个曲边梯形，把这些梯形面积积分起来，就得到了二重积分的值。

下面就是最基本的形式：

$$
\iint_Df(x,y)dxdy = \int_a^bdx\int_{\phi_1(x)}^{\phi_2(x)}f(x,y)dy
$$

必要的时候可以把区域划分为多个小区域，分别积分后加在一起。有时候也可以用几何意义，虽然道理讲不清楚。

>   几个作业题：（懒得打，以后再加进来）

##### 换元

>   都是因为这题作业题我才会纠结换元的问题：
>
>   计算$\iint_{D} x^{2} y^{2} \mathrm{d} x \mathrm{d} y$，其中$D$是由曲线$x y=1$、$x y=2$和直线$y=x$、$y=4x$所围成的第一象限的区域。

换元实际上就是面积的变换，利用我最讨厌的Jacobi行列式就可以做到。
$$
\iint_Df(x,y)dxdy = \iint_{D'}g(u,v)\left|\frac{\partial(x,y)}{\partial{(u,v)}}\right|dudv
$$
具体证明并不复杂，就是考虑每个面积元在变换实施后的改变。

利用换元法，就可以直接获得极坐标下二重积分的计算方法。（大概就是旋转体体积柱壳法的来源）

##### 极坐标

设$x = \rho\cos\theta$，$y=\rho\sin\theta$

$$
\iint_Df(x,y)dxdy = \iint_Df(\rho\cos\theta, \rho\sin\theta)\left|\frac{\partial(x,y)}{\partial{(\rho,\theta)}}\right|d\rho d\theta
$$

其中

$$
\left|\frac{\partial(x,y)}{\partial{(\rho,\theta)}}\right| = 
\begin{vmatrix}
\cos\theta & -\rho\sin\theta \\
\sin\theta & \rho\cos\theta
\end{vmatrix} = \rho
$$

故：

$$
\iint_Df(x,y)dxdy = \iint_D\rho f(\rho\cos\theta, \rho\sin\theta) \cdot d\rho d\theta
$$

>   这就是大物里面求圆盘转动摩擦力矩的积分方法。

#### 三重积分

基本思想也是替换成累次积分

##### 先一后二法（投影法）

本质就是把一块体积看作是无数细长柱体拼起来的，先在线段上积分（一元积分），然后把投影面积上的线再积起来（二元积分）。

##### 先二后一法（截面法）

这个比较好理解，就是把一个区域切成很多薄片，每个薄片分别进行二重积分，最后再积起来。

##### 换元法

跟二元一样。一般是换成柱坐标或者球坐标。

换成柱坐标好说，但是换成球坐标还是需要注意。

设

$$
\left\{
\begin{aligned}
& x = \rho\sin\phi\cos\theta \\
& y = \rho\sin\phi\sin\theta \\
& z = \rho\cos\phi
\end{aligned}
\right.
$$

>   $\theta$是向量与x轴夹角，$\phi$是向量与z轴夹角。画个图好理解。书上是理解为三个曲面交出一个点（球面，圆锥面，平面）。总之很独特，感觉比二维的情况复杂多了。

Jacobi行列式不好算，总之，最终得到结果$dv = \rho^2\sin\phi \ d\rho d\phi d\theta$

#### 重积分的几个典型应用

>   一切按定义推。如果写成矢量形式会更简洁。

##### 求重心

假设有一个平面薄片，密度分布函数为$\rho(x, y)$，$\vec s = x\vec i + y\vec j$是薄片上某一质点的位矢。

则总质量就是

$$
M = \iint_D \rho(x,y) d\sigma
$$

重心的位矢就是

$$
\vec s_0 = \frac{1}{M}\int_D\vec{r}\rho(x, y) \ d\sigma
$$

>   三维物体如法炮制即可。

##### 求转动惯量

物体的空间区域为$\Omega$，有连续的密度分布函数$\rho(x,y,z)$

对$z$轴的转动惯量就是

$$
I_z = \iiint_\Omega (x^2+y^2)\rho(x,y,z) \ dV
$$

对原点的转动惯量就是

$$
I_O = \iiint_{\Omega} (x^2+y^2+z^2)\rho(x,y,z)\ dV
$$

##### 求引力

物体空间区域为$\Omega$，给定一个质点的位矢$\vec{s}$，有密度$\rho(\vec s)$，求这个物体对区域外一点$\vec s_0$的万有引力。
$$
\vec F = G\iiint_\Omega\frac{\rho(\vec s)}{|\vec s - \vec{s}_0|}(\vec s - \vec s_0) \ dV
$$

### 曲线曲面积分

#### 第一类曲线积分（对弧长）

$$
\int_Lf(x,y) ds
$$

如果是闭合曲线，则记为
$$
\oint_Lf(x,y)d s
$$
各种性质不再赘述。关键是怎么求。

基本思路就是化为参数方程

$$
\begin{cases}
x = \phi(t)\\
y = \psi(t)
\end{cases}
$$

则
$$
ds = \sqrt{x'^2_t + y'^2_t}dt
$$

$$
\int_Lf(x,y)ds = \int_{t_1}^{t_2}f[\phi(t), \psi(t)]\sqrt{\phi'^2(t)+\psi'^2(t)}dt
$$

>   虽然看起来很丑，但是实际做起来并不难，只是繁琐罢了。这种做法有很多条件，具体看书，不是重点。更高维的如法炮制。

如果是极坐标，需要注意
$$
ds = \sqrt{r^2+r'^2}d\theta
$$

#### 第二类曲线积分（对坐标）

$$
\int_L\vec{F}\cdot d\vec{s}
$$

三个轴分别积分就是了。不难，反而更简单。

{--不是三个轴分别积分那么简单的，这样分别积分是有条件的。（路径是折线）--} 把问题复杂化了。

用参数方程来理解。

$$
\left\{
\begin{aligned}
& x = x(t) \\ 
& y = y(t)
\end{aligned}
\right.
$$

然后代进积分中

$$
\int_{L}P(x,y)dx + Q(x, y)dy = \int_LP(x(t), y(t))x'(t)dt + \cdots
$$

{++稍微化一下就能发现++}

$$
\int_{L}P(x,y)dx + Q(x, y)dy = \int_LP(x(t), y(t))x'(t)dt + Q(x(t), y(t))y'(t)dt = \int_LP(x(t), y(t))x'(t)dt + \int_L Q(x(t), y(t))y'(t)dt = \int_LPdx + \int_LQdy
$$

>   两类曲线积分是可以互相转换的
>   
>   $$
> \int_L\vec F\cdot d\vec s = \int_L \frac{\vec F\cdot \nabla\vec s}{|\nabla\vec s|}ds
> $$
#### Green公式

>   类比Newton-Leibniz公式？

先对区域分类。

>   单连通区域和复连通区域
>
>   如果$D$内任何一条闭合曲线所围的区域都属于$D$，那么就是单连通的。简单说就是**没有洞**。否则就是复连通（有洞）。

考虑一个单连通的闭区域$D$，函数$P(x,y)$和$Q(x,y)$在区域内**都有连续的一阶偏导数**，$L$是区域$D$的边界，那么

$$
\iint_D\left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)dxdy = \oint_L Pdx + Qdy
$$

>   果不其然，证明用了Newton-Leibniz公式。
>
>   需要考虑$x$型还是$y$型。书上证明假定既是$x$型，也是$y$型，比较普遍。
>
>   必须强调 ==$L$是有正方向的，也就是$D$始终在观察者的左侧==
>
>   如果$D$是复连通区域，那么需要考虑全部边界的曲线积分，然后*加*起来。

Green公式还可以写成向量形式

$$
\oint_C \vec F \cdot\vec n^0ds = \iint_D\nabla \vec F d\sigma
$$

利用Green公式，可以得到一个面积公式

$$
A = \frac{1}{2}\oint_Lxdy-ydx
$$

> 计算
> 
> $$
>  \oint_C \frac{xdy-ydx}{x^2+y^2}
> $$
> 
> $C$是**包围原点**的任意闭合曲线
>  
> > 注意，Green公式不能用，因为在原点没有定义，也就没有偏导数

#### Gauss公式

Green公式的三维推广

#### Stokes公式

曲面积分与曲面边界的曲线积分的关系。

$$
\iint_\Sigma\left(\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z}\right)dydz + \left(\frac{\partial P}{\partial z}-\frac{\partial R}{\partial x}\right)dzdx + \left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dxdy = \oint_\Gamma Pdx + Qdy + Rdz
$$

行列式助记

$$
\iint_\Sigma
\begin{vmatrix}
dydz & dzdx & dxdy \\
\frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\
P & Q & R
\end{vmatrix} 
= \oint_L Pdx + Qdy + Rdz
$$

向量形式

$$
\iint_\Sigma \mathrm{rot} \vec A\cdot\vec ndS = \oint_L \vec A\cdot \vec t ds
$$

### 散度和旋度

> 本节内容参考《矢量分析和场论》

#### 散度

*公式支持垃圾，不写了*。
$$
\iint_\Omega \left(P dydz + Qdzdz+Rdxdy\right)dv
$$

$$
\mathrm{div}\boldsymbol{v} = \frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}
$$

实际上是用了Gauss公式：
$$
\iint_\Sigma \vec v \cdot \vec ndS = \iiint_\Omega \mathrm{div}\vec vdv
$$

#### 旋度

$$
\mathrm{rot}\boldsymbol A = \begin{vmatrix}
\boldsymbol i & \boldsymbol j & \boldsymbol k \\
\frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\
P & Q & R
\end{vmatrix}
$$

实际上是用Stokes公式：
$$
\oint_L \vec v\cdot d\vec s = \iint_\Sigma \mathrm{rot}\vec v\cdot \vec ndS
$$

## 微分方程

>   主要是常微分方程，这部分内容老师自己的讲义写得比教材清楚（而且教材有种怪味），因此这部分的笔记基本上是照搬老师的讲义。

### 一、二阶的一些特殊的常系数微分方程

>   非线性微分方程不是每个我们都能解，所以才会出现下面这种奇奇怪怪的分类，只是一个技巧的总结，不成一个知识体系。

1.  可分离变量的：分离变量，两边积分

2.  齐次的

    方程肯定可以化为这种形式
    
    $$
    \frac{dx}{dy} = f\left(\frac{y}{x}\right)
    $$
    
    接下来只需设$u = y/x$，就**可分离变量**了。
    
    $$
    u + x\frac{du}{dx} = f(u)
    $$

3.  可化为齐次的

    对于
    
    $$
    y' = f\left(\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)
    $$

    利用不动点，也就是分子分母联立，解方程组。如果系数矩阵为0，说明上下两个方程线性相关，可以直接换元为可分离变量的微分方程。
    
4.  可降阶的二阶微分方程

    1. $y''=f(x,y')$，令$y'=u(x)$
    2. $y''=f(y,y')$，令$y'=u(y)$

5. Bernoulli方程

    $$
    y'+P(x)y=Q(x)y^n
    $$

    方程两边同时除以$y^n$，化为一阶线性方程。

6. 全微分方程（恰当方程）

    $$
    P(x,y)dx + Q(x,y)dy = 0
    $$

    需要验证平衡条件$\displaystyle \frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}$

    若不满足平衡条件，可以尝试找*积分因子*

### n阶线性微分方程

#### 一阶线性方程

可以直接套公式。也可以求出对应其次方程的通解，然后加上这个非其次方程的一个特解。

$$
\frac{dy}{dx} + P(x)y = Q(x)
$$

$$
y = e^{-\int P(x)dx}\left(\int Q(x)e^{\int P(x)dx} + C\right)
$$

> 具体推导过程书上有。

#### 二阶线性方程

$$
\frac{d^2y}{dx}+P(x)\frac{dy}{dx}+Q(x)y = 0
$$

如果已知齐次方程一个解，可以直接使用Liouville公式，求得另一个线性无关的解。
$$
y_2 = y_1\int\frac{1}{y_1^2}e^{-\int P(x)dx}dx
$$

> Wronsky行列式可以判断函数组是否线性相关。
>
> $W(x)_{i,j} = y_i^{(j)}$

> 对于非齐次方程，使用常数变易法。
>
> 假设$C_1(x)和$$C_2(x)$，
> $$
> y^* = C_1(x)y_1 + C_2(x)y_2
> $$
> 然后求导，添加限制条件，解方程。

#### 二阶常系数微分方程

$$
y'' + py' + qy = 0
$$

设$t = e^{rx}$，则得到特征方程
$$
r^2 + pr + q = 0
$$
如果没有重根（共轭复根也是），那么直接线性组合即可。如果有重根，则$x$乘以求得的根就是另一个根。

