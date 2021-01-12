---
title: OC Swift 混编问题
date: 2021-01-04 17:19:21
tags:
- iOS
- 问题
categories:
- iOS 开发笔记

---



最近要使用一个支付的 SDK，纯 Swift 写的，用 CocoaPods 引入之后，怎么都找不到 `Adyen-Swift.h`文件，新建一个工程之后，在 `Podfile`中添加`use_frameworks!`就能找到。

最后通过`@import Adyen`解决的。

并不知道为什么！