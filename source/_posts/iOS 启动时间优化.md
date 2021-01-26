---
title: iOS 启动时间优化
date: 2021-01-18 14:23:24
tags:
- iOS
- 优化
- 学习资料
categories:
- iOS 开发笔记
---



[TOC]

## 文档相关

### Reducing Your App's Launch Time

https://developer.apple.com/documentation/xcode/improving_your_app_s_performance/reducing_your_app_s_launch_time?language=objc



## WWDC 相关视频

### 2012-235 iOS App 性能

统计 main 函数到 didFinishLaunching 的时间

iOS App Performance: Responsiveness

https://developer.apple.com/videos/play/wwdc2012/235/



### 2016-406 优化启动时间

启动各个阶段所做的事情 主要为 main 函数前

Optimizing App Startup Time

https://developer.apple.com/videos/play/wwdc2016/406/

http://yulingtianxia.com/blog/2016/10/30/Optimizing-App-Startup-Time/

https://www.jianshu.com/p/3b0256192e4e



### 2016-418 Time Profile 的使用

Using Time Profiler in Instruments

https://developer.apple.com/videos/play/wwdc2016/418/



### 2017-413 App 启动时间：过去、现在与未来

App Startup Time: Past, Present, and Future

https://developer.apple.com/videos/play/wwdc2017/413/

https://www.jianshu.com/p/96f66b0c943c



### 2017-706 GCD 的使用

Modernizing Grand Central Dispatch Usage

https://developer.apple.com/videos/play/wwdc2017/706/



### 2018-220 高性能自动布局

High Performance Auto Layout

https://developer.apple.com/videos/play/wwdc2018/220/



### 2018-405 通过日志记录衡量性能

Measuring Performance Using Logging

https://developer.apple.com/videos/play/wwdc2018/405/



### 2018-407 实现出色 App 性能的实用方法

Practical Approaches to Great App Performance

https://developer.apple.com/videos/play/wwdc2018/407/



### 2019-411 Instruments 的使用

Getting Started with Instruments

https://developer.apple.com/videos/play/wwdc2019/411/



### 2019-423 优化 App 启动

启动各个阶段可以做的优化以及 App Launch 的使用示例

Optimizing App Launch

https://developer.apple.com/videos/play/wwdc2019/423/

https://xiaozhuanlan.com/topic/4690823715



## 博客文章

### iOS应用启动性能优化资料（汇总）

https://everettjf.github.io/2018/08/06/ios-launch-performance-collection/



### iOS 如何优化 App 的启动耗时

https://gsl201600.github.io/2020/04/01/iOS%E5%A6%82%E4%BD%95%E4%BC%98%E5%8C%96App%E7%9A%84%E5%90%AF%E5%8A%A8%E8%80%97%E6%97%B6/



### APP 启动速度优化

描述了启动各个阶段所做的事情

https://medium.com/@EdisonFan/%E5%90%AF%E5%8A%A8%E9%80%9F%E5%BA%A6%E4%BC%98%E5%8C%96-872cbff15859



### 深入探索 iOS 启动速度优化

https://juejin.cn/post/6844904127068110862



### 高德 APP 启动耗时剖析与优化实践（iOS 篇）

https://www.infoq.cn/article/xjb3cysclphv5sh5923q



### 抖音品质建设 - iOS启动优化《原理篇》

https://mp.weixin.qq.com/s/3-Sbqe9gxdV6eI1f435BDg



### 抖音品质建设 - iOS启动优化《实战篇》

https://mp.weixin.qq.com/s/ekXfFu4-rmZpHwzFuKiLXw



### iOS 优化篇 - 启动优化之Clang插桩实现二进制重排

https://mp.weixin.qq.com/s/UlMAvuLuTcWgd3qkEAHYMA



### 今日头条 iOS 客户端启动速度优化

https://juejin.cn/post/6844903649416577037



### 马蜂窝 iOS App 启动治理：回归用户体验

https://juejin.cn/post/6844903841410842638



### 美团外卖 iOS App 冷启动治理

https://tech.meituan.com/2018/12/06/waimai-ios-optimizing-startup.html