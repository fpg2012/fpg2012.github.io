---
layout: "post"
title: "找中位数的线性时间算法"
tag: ["算法"]
description: "困难的不是算法的思想，而是证明时间复杂度是线性。"
category: ["note"]
date: "2022-11-25"
comment: true
---

困难的不是算法的思想，而是证明时间复杂度是线性。首先可以修改快排的Partition步骤，获得一个期望时间为$O(n)$的算法，这里姑且称之为**算法1**。用一些特别的办法改进Partition时**主元**的选择，可以获得一个最坏情况下时间复杂度为$O(n)$的算法，这里姑且称之为**算法1a**

# 算法1

步骤：

1. 任选一个元素$x$作为主元，应用快排$\text{Partition}$的对数组进行分块（小的在前），记分块后$x$的下标为$k$
2. 若$k\lt \lfloor n/2\rfloor$，那么说明中位数大于$x$，对右侧执行第一步
3. 若$k\gt \lfloor n/2\rfloor$，那么说明中位数小于$x$，对左侧执行第一步
4. 若$k = \lfloor n/2 \rfloor$，那么$x$就是中位数

$\text{Partition}$伪代码如下

```
partition(A[], l, r) {
    i = l-1, j = l
    p_i = random(l, r) // 等概率在[l, r)中选取一个整数
    swap(A[r-1], A[p_i])
    pivot = A[r-1]
    while (j < r) {
        if (A[j] <= pivot) {
            i = i + 1
            swap(A[j], A[i])
        }
        ++j
    }
    return i // 返回分块后主元的位置
}
```

下面分析时间复杂度，可以得到递归式

$$
T(n) = T(\max \{ n-k, k\}) + O(n)
$$

我们假设选取主元是随机的，并且每个元素有相等的概率（即$P = 1/n$）被选为主元，那么对上式取期望

$$
\begin{aligned}
E[T(n)] & = E[T(\max \{ n-k, k\}) + O(n)] \\
&= E[T(\max \{ n-k, k\})] + O(n) \\
&= \frac{1}{n} \sum_{i=0}^{n-1}E[T(\max \{ n-k, k\})] + O(n)
\end{aligned}
$$

注意到，当$k < \lfloor n/2 \rfloor$时，$n-k \ge k$，否则$k \ge n-k$，那么在上面的那个合式中，$T(\lfloor n/2 \rfloor + 1), T(\lfloor n/2 \rfloor + 2) , \dots, T(n-1)$出现了两次，所以得到

$$
\begin{aligned}
E[T(n)] &= \frac{1}{n} \sum_{i=0}^{n-1}E[T(\max \{ n-k, k\})] + O(n) \\
&\le \frac{2}{n} \sum_{i=\lfloor n/2\rfloor}^{n}E[T(i)] + O(n)
\end{aligned}
$$

我们假设存在$n_0$，使$n < n_0$时有$E[T(n)] = O(1)$

那么$n = n_0$时，有

$$
E[T(n)] = O(n)
$$

> $n_0$的存在是合理的，规模很小的时候，可以视为$O(1)$。因为递归到最后，肯定有个终止条件。比如说在这个算法中，分块的区间等于1的时候，我们可以立即得到结果。

因此我们有理由假设一直到$n_1$，都存在$c$使得$E[T(n)] \le cn$，当$n > n_1$时，把上式带入递归式

$$
E[T(n)] \le \frac{2c}{n} \frac{ (\lfloor n/2 \rfloor + n )\lfloor n/2 \rfloor }{2} + O(n) = O(n)
$$

由此证明了$E[T(n)] = O(n)$

不过这个算法最坏情况是$O(n^2)$的。

> 考虑一直选取最小或者最大的元素作为主元的情况。

# 算法1a

虽然说算法1实现起来并不困难，但是最坏时间有时候会退化到$O(n^2)$，其实我们完全有办法改进选取主元的方式，使之最坏情况下时间复杂度是$O(n)$。

改进后的选取主元的步骤：

1. 将数组切分成$\lfloor n/5 \rfloor$个长度为5的数组（如果最后一组不足5个元素，就丢弃掉这组，所以是向下取整）
2. 找出每个切分后的组的中位数，逻辑上构成一个新的数组$B$
3. 调用本算法，找到中位数数组的中位数，将其作为算法1第一步的主元

在数组$B$的中位数大于至多$\lfloor 7n/10 \rfloor$个元素，小于至多$\lfloor 7n/10 \rfloor$个元素。那么算法1的递归式可以改成。

$$
T(n) \le T\left( \frac{7n}{10} \right) + O(n)
$$

同样假设有$T(n) \le cn$，代回即可验证这一假设是正确的

$$
T(n) \le \frac{7cn}{10}  + O(n) = O(n)
$$