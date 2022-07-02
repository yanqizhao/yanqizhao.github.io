[TOC]

# WWDC 22 - 110352 拥抱 Swift 泛型 概述&大纲



## 概述

### 1. 泛型是什么，什么时间用？

泛型是一个书写 Swift 抽象代码的基本工具，随着代码的演化发展，泛型是起到管理复杂性的关键。

### 2. 抽象是什么，怎么做？

抽象概念可以将思想从特定的细节中分离出来，用泛型。



## 多态分类

![image-20220628195428703](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220628195428703.png)



### Overloads 重载实现临时多态

![image-20220626141648138](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626141648138.png)

![image-20220626142527042](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626142527042.png)



### Subtypes 子类化实现子类多态

#### Any

![image-20220626150958877](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626150958877.png)



####  \<T\> 泛型

![image-20220626152712935](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626152712935.png)

![image-20220626153746315](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626153746315.png)

**根本问题是，类是一种数据类型，我们却想要尝试复杂化一个超类，然后让它代表实体类型的抽象思想。**



### Generics 泛型实现确定参数多态

#### 接口定义

![image-20220626160017654](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626160017654.png)

![image-20220626160729154](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626160729154.png)



#### 协议遵循

![image-20220626162949349](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626162949349.png)



#### 不透明类型

##### 格式

![image-20220626173329398](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626173329398.png)

###### feed<A: Animal>(_ animal: A)

![image-20220626165033294](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626165033294.png)

###### feed<A>(_ animal: A) where A: Animal

![image-20220626165151422](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626165151422.png)

###### feed(_ animal: some Animal)

![image-20220626170002361](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626170002361.png)

![image-20220626170932734](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626170932734.png)



##### 位置

![image-20220626173940091](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626173940091.png)

![image-20220626174210668](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626174210668.png)



###### 返回值位置使用 some

![image-20220626180718256](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626180718256.png)

![image-20220626181045890](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626181045890.png)

![image-20220626181303429](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626181303429.png)



###### 参数位置使用 some——Swift 5.7

![image-20220626175447382](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626175447382.png)

![image-20220626175640411](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626175640411.png)



###### 举例说明

![image-20220626191534121](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626191534121.png)



###### 参数位置使用 any——Swift 5.7

![image-20220626205642059](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626205642059.png)



###### 举例说明

![image-20220626203030188](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626203030188.png)

![image-20220626203102314](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626203102314.png)

![image-20220626204819602](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626204819602.png)

![image-20220626205158501](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626205158501.png)

![image-20220626205904465](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626205904465.png)

![image-20220626210358657](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626210358657.png)

![image-20220626211430157](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626211430157.png)

![image-20220626215127833](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626215127833.png)



#### 总结

![image-20220626215828321](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626215828321.png)



## 总结

![image-20220626220750663](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626220750663.png)

