# WWDC 22 - 110353 设计 Swift 协议接口 第一次整理

抽象实体类型&模型化类型关系

1. 类型擦除
2. 返回值使用不透明类型
3. 参数使用存在主义类型



![image-20220629165456814](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629165456814.png)

![image-20220629171528411](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629171528411.png)



## 返回值位置使用 any——Swift 5.7

## 返回值位置使用关联类型——Swift 5.7

![image-20220629171725309](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629171725309.png)

![image-20220629174027749](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629174027749.png)

![image-20220629174755209](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629174755209.png)



## 参数位置使用关联类型——Swift 5.7

![image-20220629175125068](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629175125068.png)

![image-20220630090825995](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630090825995.png)

![image-20220630091131974](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630091131974.png)



### 5.6 就有的语言特性(返回值位置)

![image-20220630091555660](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630091555660.png)

![image-20220630091709706](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630091709706.png)

![image-20220630091851919](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630091851919.png)

![image-20220630092431718](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630092431718.png)





![image-20220630093842665](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630093842665.png)

![image-20220630094032753](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630094032753.png)

![image-20220630094835199](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630094835199.png)

![image-20220630095819276](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630095819276.png)

![image-20220630100218811](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630100218811.png)



##  泛型限制位置使用 any——Swift 5.7

![image-20220630112236985](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630112236985.png)

![image-20220630113056298](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630113056298.png)

![image-20220630113748370](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630113748370.png)

## 返回值位置使用 some(有泛型)

![image-20220630115019329](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630115019329.png)

## 返回值位置使用 any(有泛型)——Swift 5.7

![image-20220630115034795](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630115034795.png)

![image-20220630130306325](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630130306325.png)

![image-20220630130357415](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630130357415.png)

![image-20220630130545010](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630130545010.png)



## 参数位置使用关联类型 2——Swift 5.7

![image-20220630131309999](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630131309999.png)

![image-20220630131748293](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630131748293.png)

![image-20220630132014917](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630132014917.png)

![image-20220630133327284](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630133327284.png)

对 some Animal 调用 eat() 方法期待的返回值类型是 (some Animal).FeedType，而不是 (some Animal).FeedType.CropType.FeedType。

![image-20220630163559858](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630163559858.png)

![IMG_2469](/Users/yanqizhao/Downloads/IMG_2469.JPG)

![IMG_2474](/Users/yanqizhao/Downloads/IMG_2474.JPG)

![IMG_2475](/Users/yanqizhao/Downloads/IMG_2475.JPG)

![IMG_2476](/Users/yanqizhao/Downloads/IMG_2476.JPG)

