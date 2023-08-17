---
title: 评论系统迁移至utterances
category: ["writing"]
date: "2023-08-17"
tag:
  - "瞎写"
  - "blog"
comment: true
layout: post
---

先前博客一直在使用valine作为评论系统。一直以来运行“良好”，我始终没察觉到它的问题，毕竟除了我自己没有人会来这里评论。

但是今年情况发生了变化。我那篇《Hyprland的配置》的文章下出现了本站第一条游客评论，但因为Valine没有邮件提醒的功能，我没有在5月份那条评论出现的第一时间看到它。等到我回复的时候，我想评论主已经不会回头来访问本站了。

另外valine还存在较为严重的安全性问题，我之前一直没有注意到。

为了替换掉valine，我先后尝试了几个评论系统：

1. remark42
2. isso
3. utterances

remark42和isso都是自部署的评论系统。remark42效果不错，但是必须要确保服务器的域名和博客网站的域名相同才能使用GitHub登陆，这一点我无法满足。isso较remark42简单很多，但是可扩展性太差，无法修改邮件模板，导致邮件统统被识别为spam，无法发送，这点我无法容忍。

故最后还是使用了utterances。utterances使用github的issue作为评论区，省去了一大堆麻烦的配置和部署。utterances的缺点是会申请“act on your behalf”的权限，无法保证一定不会出现安全性问题。**如果您不信任utterances，可以直接到对应的issue（标题为页面的相对路径，可以参考issues中现有的issue）进行评论，避免授权给utterances**。

------

这里要向《Hyprland的配置》一文下的评论游客道歉，我更换了评论系统，原先的评论也就不再显示，我的回复您也看不到了。
