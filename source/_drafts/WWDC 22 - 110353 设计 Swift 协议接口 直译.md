# WWDC 22 - 110353 设计 Swift 协议接口 直译

我将会为你展示一些使用协议抽象实体类型和模型化类型关系的高级技巧， 这个视频会涉及到已经存在的语言特性与 Swift 5.7 引入的新的能力。

这个视频有三个主题：

首先，我将通过解释返回值类型擦除的例子来为你展示协议和关联类型与 any 的共同使用。

![image-20220629164630483](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629164630483.png)

接下来，我将通过隔离接口与实现来解释返回值使用不透明类型的进一步优化封装。

![image-20220629164839506](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629164839506.png)

最后一点，你将看到协议中相同类型的必要条件是如何模型化多种不同实体类型的关系的。

![image-20220629165151452](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629165151452.png)



首先让我们从学习协议和关联类型是如何与 any 共同作用的。

这里，我们有一个包含多个协议和四个实体类型的数据模型。这里有两种动物，鸡和奶牛，和两种食物，鸡蛋和牛奶。

![image-20220629165311725](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629165311725.png)

鸡下蛋，奶牛产奶。

![image-20220629165456814](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629165456814.png)

为了抽象食物的产出，我为 Animal 协议添加了一个 produce() 方法。

![image-20220629165620924](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629165620924.png)

你应该还记得上一个视频中，对不同返回值类型进行抽象(如对奶牛和鸡分别调用 produce() 方法)的最佳方法是使用一个关联类型。

通过使用关联类型，我们进行如下声明：

给 Animal 声明一些实体类型，调用 produce() 方法返回某个具体的 Food 类型，是依赖于对应的 Animal 实体类型的。

我们可以用一张图来表示这种关系。

![image-20220629171008403](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629171008403.png)

 协议中的 self 代表一个遵循 Animal 协议的真实的实体类型，self 类型有一个关联类型：CommodityType，这个类型遵循 Food 协议。

让我们来看看奶牛和鸡这些实体类型与图中 Animal 协议的关联类型的关系。

鸡类型遵循 Animal 协议，同时其 CommodityType 的类型为 Egg。

![image-20220629171528411](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629171528411.png)

而奶牛类型遵循 Animal 协议，其 CommodityType 为 Milk。

![image-20220629171619514](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629171619514.png)

现在我们可以说我们的农场里有好多种动物，animals 存储属性是一个元素为异源 any Animal 类型的数组。

![image-20220629171725309](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629171725309.png)

在上个视频中，我们看到了 any Animal 类型是如何拥有一个盒子而有能力动态存储任何实体动物类型的。为不同的实体类型使用相同的表达形式的策略叫做类型擦除。

produceCommodities() 方法遍历了 animals 数组并对每一个 animal 调用了 produce() 方法。

这个方法看起来很简单，但是我们知道类型擦除会将动物的基本类型之间的静态关系消除掉，所以这值得我们深入了解一下，为什么会有这样的代码检查。

map 闭包中的 animal 实例的类型是 any Animal。

![image-20220629172625634](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629172625634.png)

而 produce() 方法返回值的类型是一个关联类型。

![image-20220629172716930](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629172716930.png)

当你调用一个方法，其返回值是一个存在主义类型实例的关联类型时，编译器会使用类型擦除来决定这次调用的返回值类型。

![image-20220629172841153](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629172841153.png)

类型擦除取代了这些关联类型和相关的存在主义类型，有相同的限制。

![image-20220629173021458](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629173021458.png)

我们通过使用 any Animal 和 any Food 擦除了 Animal 实体类型与关联类型 CommodityType 的关系。

any Food 的类型被叫做关联类型 CommodityType 的上层限制。(upper bound)

既然 produce() 方法是被 any Animal 调用的，而返回值类型又被擦除了，返回给我们的就是一个 any Food 的返回值类型，这恰恰是我们所期待的类型。

![image-20220629174005511](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629174005511.png)

让我们仔细看看 Swift 5.7 中的新特性关联类型的擦除是如何工作的。关联类型出现在协议方法返回值类型的位置，即在方法声明中箭头的右边被叫做“产出位置”，因为调用这个方法将会得出一个该类型的值。

![image-20220629174027749](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629174027749.png)

当我们对 any Animal 调用这个方法时，我们在编译时是不知道返回值的实体类型的，但是我们知道它是“上层限制”的某个子类。

![image-20220629174451155](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629174451155.png)

这里是一个示例，我们对 any Animal 调用 produce() 方法，在运行时，这个数组中只有一个 Cow() 实例，在这种情况下，produce() 方法返回值的类型是 Milk，Milk 是可以被存储在 any Food 中的，它是在 Animal 协议中被定义的关联类型 CommodityType 的“上层限制”。

![image-20220629174755209](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629174755209.png)

这在遵循 Animal 协议的实体类型中总是安全的。

![image-20220629175017570](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629175017570.png)



让我们考虑一下如果关联类型出现在方法的参数列表或者是构造器中在会发生什么吧。

![image-20220629175125068](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629175125068.png)