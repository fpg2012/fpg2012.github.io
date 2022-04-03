---
title: Material Design 相关组件笔记
date: "2021-12-03"
description: "整理自《第一行代码》，原文过于啰嗦不便查阅，故摘抄整理之。"
categories: ["dev"]
tags:
  - 笔记
  - 归纳整理
  - 安卓
  - Material Design
comments: true
---

> 整理自《第一行代码》，原文过于啰嗦不便查阅，故摘抄整理之。理解肤浅，有错见谅。
> 
> 插图均来自[material.io](material.io)，侵删。

## 工具栏 Toolbar

### 如何使用Toolbar？

1. 修改主题（在`res/values/style.xml`中）为`Theme.AppCompact.NoActionBar`（深色）或`Theme.AppCompact.Light.NoActionBar`（浅色），目的是隐藏默认的`ActionBar`

2. 设置颜色，即`ColorPrimary`等属性（在`res/values/style.xml`中）

3. 在布局中引入`Toolbar`（包为`androidx.appcompat.widget.Toolbar`）

4. 布局应该重设命名空间为`xmlns:app`

5. `Activity`中调用`setSupportActionBar(toolbar)`

> 使用`app`命名空间，而不是`android`，是为了兼容老版本，防止和旧控件冲突

### 如何配置Toolbar显示的内容？

1. 文字：修改`AndroidManifest.xml`，当中`<application>`标签下，可以设置对应Activity的的标题栏文字

2. 增加按钮
   
   1. 新建Menu Resource，添加`<item>`和对应的action按钮，`android:id`、`android:icon`、`android:title`分别设定id、图标和文字
   
   2. 设置`app:showAsAction`指定按钮的显示位置，`always`、`ifRoom`、`never`分别对应「永远显示」、「无空间则进菜单」和「永远在菜单中」
   
   3. 设置按钮的事件：`override onOptionItemSelected(item: Menu Item)`

> 更高级的Toolbar——可折叠工具栏CollapsingToolbarLayout

## 抽屉布局 DrawerLayout

1. 直接使用`DrawerLayout`，其下第一个子控件为主界面，第二个子控件为抽屉中的内容（`layout_gravity`最好设为`start`）

2. 在`Toolbar`最左侧添加菜单按钮「Home按钮」：在Activity中，设置
   
   ```kotlin
   supportActionBar?.let {
       it.setDisplayHomeAsUpEnabled(true) // 启用菜单按钮
       it.setHomeAsUpIndicator(R.drawable.ic_menu) // 图标
   }
   ```
   
   然后在重写的`onOptionsItemSelected`中，当菜单按钮被按下时唤出抽屉
   
   ```kotlin
   // ...
   when (item.itemId) {
       // home按钮的id永远是home
       android.R.id.home -> drawerLayout.openDrawer(GravityCompat.START)
   }
   // ...
   ```

## 导航视图 NavigationView

![](https://lh3.googleusercontent.com/W4QDMYeNtcm37g2JfKKj5lv8rJ6KGLb9vZdYUNEpjixpHDjjQ_hPrwnj5Ruo1ZYHyukHLRQCtXrzQV6gLzRSNE-w60QYjFcUZZ_2=w1064-v0)

导航视图适合与抽屉布局一起使用。

包括两个部分：`headerLayout`和`menu`。分别需要定义对应部分的布局。menu还需要有个xml文件定义菜单中的具体项目。

设置完成所需的xml后，将`NavigationView`添加到`DrawerLayout`中。

要处理对应的点击事件，只要调用`NavigationView`对象的`setNavigationItemSelectedListener`进行设置，比如

```kotlin
navView.setNavigationItemSelectedListener {
    drawerLayout.closeDrawers()
    true // 表示事件已经被处理
}
```

## 悬浮按钮 FloatingActionButton

相当简单，在布局中加入`<com.google.android.material.floatingactionbutton.FloatingActionButton>`，设置对应的图标和其他属性。设置`app:elevation`可以调整z轴上的「悬浮高度」。

> 默认颜色为`colorAccent`

点击事件和`Button`没有区别。`setOnClickListener`，相当简单。

## 「快餐店」 SnackBar

SnackBar一定程度上可以替代「吐司」Toast。相比Toast，用户不仅仅是被动接受通知，而是可以给出一定反馈。

![Example of snackbar on a mobile screen](https://lh3.googleusercontent.com/-osHhhWWYPzLb8UmhUU1pmmd2q-bUj1vU8raFKcPtAxDPMdRlGixw31rhd1EcOiW6guvgFZAflH7rFF1b-D45Pk-SFmPGiBg9BpazQ=w1064-v0)

用法类似Toast，比如

```kotlin
Snackbar.make(view, "Can't send photo", Snakebar.LENGTH_SHORT)
    .setAction("Retry") {
        // retry
    }.show()
}
```

## 协调布局 CoordinatorLayout

增强版的`FrameLayout`，具有一定Material Design相关的能力。比如Snakebar弹出的时候不会覆盖住「悬浮按钮」，而是会将悬浮按钮「挤」上去。

## 卡片视图 MaterialCardView

原先的卡片加了点阴影。略。

## 应用栏布局 AppBarLayout

使用协调布局时，Toolbar会被主体部分遮盖。因此引入应用栏布局。使用时将Toolbar包裹到AppBarLayout当中即可保证Toolbar不被遮挡。而且可以顺带通过调整`app:layout_scrollFlags`来实现向上滚动自动隐藏Toolbar的功能。

## 下拉刷新布局 SwipeRefreshLayout

Material Design风格的下拉刷新。使用的时候可以把RecyclerView包裹到下拉刷新布局中。

假设`SwipeRefreshLayout`的id为`swipeRefresh`，那么用例如下

```kotlin
swipeRefresh.setColorSchemeResources(R.color.colorPrimary)
swipeRefresh.setOnRefreshListener {
    // 刷新逻辑
    myRefresh(adapter)
}
```

```kotlin
private fun myRefresh(adapter: XXXAdapter) {
    thread {
        // Thread.sleep(2000)
        runOnUiThread {
            // ...
            adapter.notifyDataSetChanged()
            swipeRefresh.isRefreshing = false;
        }
    }
}
```

下拉自动开始刷新（显示刷新进度条，并用`thread`函数开新线程执行刷新逻辑），刷新完成后，用`runOnUiThread`回到界面线程并停止刷新（隐藏刷新进度条）。

## 其他种种部件

上[material.io](material.io)应有尽有。


