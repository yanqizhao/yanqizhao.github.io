---
title: React Native Flexbox 布局
date: 2020-12-23 17:19:21
tags:
- 编程语言
- UI
categories:
- React Native
---



[TOC]

## flex

数值，子元素的主轴填充，一个区域根据每个元素 flex 值的和进行划分。

## flexDirection

主轴方向。

#### column(默认)

竖直方向上对齐。

#### column-reverse

竖直方向下对齐。

#### row

水平方向左对齐。

#### row-reverse

水平方向右对齐。

## justifyContent

子元素在主轴上的排列方式。

主轴没有 `stretch`、`baseline`属性。

#### flex-start(默认)

左对齐或上对齐。

#### flex-end

右对齐或下对齐。

#### center

居中对齐。

#### space-between

无边距的平均分布。

#### space-around

有边距的平均分布。

#### space-evenly

完全平均分布。

## alignItems

子元素在次轴上的排列方式，只作用于当前行或当前列(可换行时)。

次轴没有`space-between`、`space-around`、`space-evenly`属性。

#### streach(默认)

主轴方向上完全拉伸，如果设置了宽度 or 高度则失效。

![stretch](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144509.png)

#### flex-start

左对齐或上对齐。

![flex-start](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144536.png)

#### flex-end

右对齐或下对齐。

#### center

居中对齐。

#### baseline

左对齐或上对齐，基线为所有元素的最高点。

![baseline](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144557.png)

## flexWrap

#### nowrap

不换行。

#### wrap

换行。

![wrap](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144616.png)

#### wrap-reverse

逆序换行。

## alignContent

子元素在次轴上的排列方式，全局而非当前行或当前列，只在可换行时有效。

## flexBasis

数值，主轴的默认宽度 or 高度，如果同时设置了宽度 or 高度，会覆盖宽度 or 高度。

## flexGrow

数值，填充剩余可用空间，`0`为默认值，相当于没有设置该属性，可为`>=0`的浮点数，小于`1`的值代表占据宽度或高度的比例。

![flexGrow](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144636.png)

## flexShrink

数值，没有设置换行时，部分元素会被挤出屏幕，设置该属性为`1`后可为当前元素分配剩余可用空间。

![flexShrink-1](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144657.png)

![flexShrink-2](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144805.png)

![flexShrink-3](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144834.png)

## top bottom left right position

后布局的元素会覆盖先布局的元素。

### position

#### relative

相对位置，默认值。

#### absolute

绝对位置，会影响其他子元素。

![top-1](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144858.png)

![top-2](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144909.png)

![bottom](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144923.png)

![left](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144935.png)

![right](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112145018.png)

![absolute](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112145041.png)

![relative](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112145118.png)