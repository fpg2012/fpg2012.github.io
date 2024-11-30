---
title: "分块计算Attention"
description: "分块计算Attention"
tag: ["AI", "transformer", "algorithm"]
category: ["note"]
comment: true
layout: post
date: "2024-11-30"
---

> v0: 2024-11-26

分16块串行计算，使显存占用大约降到原来的1/16

## 原理

> 主要考虑ViT，所以我默认$Q,K,V$的形状都是$(H, W, C)$。

原始的attention

$$
Y = TV = \mathrm{softmax}(\frac{QK^T}{\sqrt{d}})V
$$

写成张量形式

$$
T_{ijpq} = \frac{\exp(Q_{ij}K_{pq} / \sqrt{d})}{\sum_{p,q}\exp(Q_{ij}K_{pq}/\sqrt{d})}
$$

$$
Y_{ij} = \sum_{p,q}T_{ijpq}V_{pq}
$$

分块之后，只要把$i$和$p$的取值范围划分为四个区间几个。
主要的问题在于softmax。

## softmax

softmax式子如下（下面的式子简明起见，把Attention展平成二维的$(H\times W, H\times W)$）

$$
\mathrm{softmax} (A_{ij}) = \frac{\exp(A_{ij})}{\sum_{j}\exp(A_{ij})} = \frac{\exp(A_{ij} - m_i)}{\sum_{j}\exp(A_{ij} - m_i)}
$$

其中

$$
m_i = \max_j A_{ij}
$$

$m$是每行（对应每个query）的最大值。不减去最大值的话，数值会爆炸，算出来全是NaN。
于是问题就来了——下面的$\sum_{p,q}\exp(Q_{ij}K_{ij} / \sqrt{d} - m_{ij})$怎么求？怎么统计$m_{ij}$？
答案是，分块统计。
首先改写式子

$$
T_{ijpq} = \exp(Q_{ij}K_{pq} / \sqrt{d})
$$

$$
Y_{ij} = \frac{\sum_{p,q}T_{ijpq}V_{pq}}{\sum_{pq}\exp(Q_{ij}K_{pq}/\sqrt{d})}
$$

对于每一块$T'_{ijpq}$，先直接算出softmax式子的上面部分，同时保存$m'_{ij}$和$s'_{ij} = \sum_{p,q}\exp(Q_{ij}K_{ij} / \sqrt{d} - m_{ij})$。如果$p$分成四个区域，那么就会得到四个$m'_{ij}$和四个$s'_{ij}$，之后再统合出真正的$m_{ij}$和真正的$s_{ij}$，我们只需要对于每个$T'_{ij}$更新即可：

$$
T''_{ijpq} = \exp(m_{ij} - m'_{ij}) T'_{ij}
$$

对$s_{ij}$也要做相同的更新。最后乘$V$，这个分块就很好做了。把$p$的每个分块分别做矩阵乘，然后加到一起就是了。最终的结果要再除以$s$.

## 代码

```python
def blocked_attention(
    Q: torch.Tensor, K: torch.Tensor, V: torch.Tensor, 
    scale=None, div: int =4, 
    use_rel_pos: bool = True, rel_pos_h: torch.Tensor = None, rel_pos_w: torch.Tensor = None
    ):
    """
    note: 
        1. Q and K should be in the same shape
        2. H and H must be divisable by `div`
        3. Q, K, V must on the same device
    """
    B, H, W, C = Q.shape
    assert(H//div * div == H and W//div * div == W)
    if scale is None:
        scale = C**-0.5
    if use_rel_pos:
        Rh = get_rel_pos(H, H, rel_pos_h).view(div, H//div, div, H//div, C).permute(0, 2, 1, 3, 4)
        Rw = get_rel_pos(W, W, rel_pos_w).view(W, W, C)

    Q = Q.view(B, div, H//div, W, C).permute(1, 0, 2, 3, 4)
    K = K.view(B, div, H//div, W, C).permute(1, 0, 2, 3, 4)
    V = V.view(B, div, H//div, W, C).permute(1, 0, 2, 3, 4)

    x = torch.zeros((B, H, W, C), dtype=torch.float32, device=Q.device)
    for i in range(div):
        s = torch.zeros((B, H//div, W, div), dtype=torch.float32, device=Q.device)
        m = torch.zeros((B, H//div, W, div), dtype=torch.float32, device=Q.device)
        y = torch.zeros((B, H//div, W, C, div), dtype=torch.float32, device=Q.device)
        for p in range(div):
            t = torch.einsum('bijc,bpqc->bijpq', Q[i] * scale, K[p])
            if use_rel_pos:
                t += torch.einsum('bijc,ipc->bijp', Q[i], Rh[i, p]).view(B, H//div, W, H//div, 1)
                t += torch.einsum('bijc,jqc->bijq', Q[i], Rw).view(B, H//div, W, 1, W)
            m[:, :, :, p], _ = torch.max(t.view(B, H//div, W, -1), dim=-1)
            t = torch.exp(t-(m[:, :, :, p]).view(B, H//div, W, 1, 1)).view(B, H//div, W, H//div, W)
            s[:, :, :, p] = torch.sum(t.view(B, H//div, W, -1), dim=-1)
            y[:, :, :, :, p] = torch.einsum('bijpq,bpqc->bijc', t, V[p])
        real_m, _ = torch.max(m, dim=-1)
        for p in range(div):
            s[:, :, :, p] *= torch.exp(m[:, :, :, p] - real_m)
            y[:, :, :, :, p] *= torch.exp(m[:, :, :, p] - real_m).view(B, H//div, W, 1)
    x[:, i*(H//div):(i+1)*(H//div), :, :] = torch.sum(y, dim=-1) / torch.sum(s, dim=-1).view(B, H//div, W, 1)

    return x
```

里面涉及到的$R_h$和$R_w$是SAM用的ViT的相对位置编码，继承自MViT。
