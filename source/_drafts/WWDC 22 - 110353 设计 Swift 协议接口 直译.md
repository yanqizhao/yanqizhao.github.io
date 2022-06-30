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

这里，Animal 协议中的 eat(:) 方法有一个关联类型 FeedType 在“消费位置”，我们调用这个方法的时候需要传递一个 FeedType 的值进去。因为转变(类型的确定)是在方法外部做的，这样就无法执行类型擦除了。

![image-20220629175125068](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220629175125068.png)

关联类型的上层限制存在主义类型并不能安全地将其转换为真实的实体类型，因为实体类型是未知的。

![image-20220630090442475](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630090442475.png)

让我们来看一个例子，我们再一次用 any Animal 存储一个 Cow 实例。

![image-20220630090754140](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630090754140.png)

假设 Cow 的 eat(:)  方法传入的参数类型为 Hay，Animal 协议 FeedType 关联类型的上层限制是 any AnimalFeed。

![image-20220630090825995](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630090825995.png)

但是传入任意的 any AnimalFeed，就没有办法静态保证是 Hay 这个实体类型的实例了。

![image-20220630091131974](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630091131974.png)

类型擦除并不允许我们将关联类型作为参数放在消费位置使用的。

取而代之的是，你必须通过将 any 类型的存在主义类型传给一个接收 some 不透明类型作为参数的函数进行拆包。

有关联类型的类型擦除行为与 Swift 5.6 中已经存在的语言特性类似，考虑一个拷贝引用类型的协议，这个协议定义了一个 clone() 方法，返回值类型为 Self。

![image-20220630091555660](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630091555660.png)

当你对一个 any Cloneable 类型的实例调用 clone() 方法时，返回值类型 Self 就被弃上层限制擦除类型了。

![image-20220630091709706](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630091709706.png)

Self 类型的上层限制总是协议本身，所以我们得到了一个新的 any Cloneable 类型的实例。

![image-20220630091851919](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630091851919.png)

所以总结一下，你可以使用 any 去声明一个存储了遵循某个协议的实体类型的存在主义类型的值，甚至可以是有关联类型的协议。

当调用一个关联类型在产出位置的协议方法时，关联类型被类型擦除为其上层限制，是另一个存在主义类型，携带了关联类型的限制(我的理解是关系，比如 Milk 和 Cow 的关系)。

![image-20220630092431718](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630092431718.png)



抽象实体类型并不只是针对函数的输入，也可以用作函数输出，所以实体类型仅在函数实现中才能被看到。

让我们看看如何将返回值位置的实体类型抽象出来，通过将必要的接口与实现细节隔离开来。使静态类型的赋值在发生变化时能够更加模块化与健壮。

让我们笼统地认为动物都需要喂食。动物会饿，当它们饿的时候就需要进食。让我们添加一个 isHungry 属性给 Animal 协议。

![image-20220630093842665](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630093842665.png)

Farm 的 feedAnimals() 方法将会对饿了的动物进行喂食。我用 filter() 方法将饥饿的动物通过 isHungry 属性过滤出来并存在计算属性 hungryAnimals 中。对 any Animal 类型的数组元素调用 filter() 将会返回一个新的 any Animal 类型的数组。

你可能注意到了 feedAnimals() 方法只对 hungryAnimals 遍历了一遍过后，就立刻忽略掉这个临时的数组了，如果农场有大量饥饿的动物的话，这是非常低效的。

![image-20220630094032753](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630094032753.png)

一种避免这种临时内存空间分配的方式是使用标准库中的懒加载集合特性。通过将 filter 替换为 lazy.filter，我们就能得到懒加载的集合了。懒加载集合与数组返回的元素是相同的，就是直白的调用了 filter，但是它可以避免临时内存空间的分配。

然而，hungryAnimals 属性的类型声明就要比它本来的实体类型复杂了：遵循 LazyFilterSequence 协议的由 any Animal 类型元素组成的数组。

这里暴露了许多不必要的实现细节。feedAnimals() 方法这个客户并不关心我们在 hungryAnimals 的实现中使用了 lazy.filter。

![image-20220630094835199](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630094835199.png)

它只需要知道它获取到的是一个可以遍历的集合就够了。

可以使用一个不透明的返回值类型来隐藏抽象接口背后的复杂的实体类型集合。

![image-20220630095819276](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630095819276.png)

现在，客户调用 hungryAnimals 时只知道它们可以得到某个遵循 Collection 协议的实体类型，但是并不知道集合具体的实体类型是什么。

然而，就像写着的那样，这样确实对客户隐藏了太多静态类型的信息。我们声明了 hungryAnimals 会输出某个遵循 Collection 协议的实体类型，但是我们对这个集合的元素类型一无所知。如果不知道这个集合的元素类型是 any Animal，我们对这个元素类型所能做的就只有将其进行传递，我们不能调用 Animal 协议中的任何方法，让我们把焦点放在遵循 Collection 协议的不透明类型的返回值上面吧。

![image-20220630100218811](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630100218811.png)

我们可以通过使用一个限制的不透明返回值类型来协调隐藏实现细节与暴露足够丰富的接口之间的平衡。

限制的不透明返回值类型是 Swift 5.7 新增的特性。

![image-20220630112236985](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630112236985.png)

一个限制的不透明返回值类型是通过在协议之后提供尖括号包裹的类型参数声明的。

Collection 协议有一个单一的类型参数，即元素的类型。

现在，一旦 hungryAnimals 的声明是一个限制的不透明返回值类型，它是一个遵循 LazyFilterSequence 协议的元素为 any Animal 类型的数组这个事实就被隐藏起来不被客户看到了，但客户仍然知道它是某个遵循 Collection 协议的实体类型，且其元素的关联类型等价于 any Animal，这才是我们真正想要的接口。

![image-20220630112538737](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630112538737.png)

在 feedAnimals() 的 for 循环中，animal 变量的的类型是 any Animal，这就允许每个 hungryAnimal 都可以调用 Animal 协议中的方法。

![image-20220630113056298](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630113056298.png)

这都是因为 Collection 协议声明了 Element 这个主要的关联类型，所以才能行得通的。你也可以像这样通过在协议名之后命名一个或多个尖括号包裹的关联类型来声明你自己的拥有主要关联类型的协议。

![image-20220630113349346](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630113349346.png)

关联类型作为主要的关联类型总是被调用者提供，例如集合的 Element 类型，与之相对的是实现细节，就像是集合的迭代类型。

你总是可以看到协议的主要关联类型与泛型的类型参数传入的实体类型之间的相关(相似)性。这里，你可以看到 Collection 协议的主要关联类型 Element 被 Element 泛型参数 Array 和 Set 实现了，这两个实体类型定义在标准库中，都遵循了 Collection 协议。

![image-20220630113748370](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630113748370.png)

Collection\<Element\> 可以通过 some 关键字的修饰被用作不透明的返回值类型。

![image-20220630115019329](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630115019329.png)

同样也可以通过 any 关键字的修饰被用作限制的存在主义类型。

![image-20220630115034795](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630115034795.png)

在 Swift 5.7 之前，你并不需要写自己的数据类型来代表一个有具体泛型参数的存在主义类型。Swift 5.7 引入限制的存在主义类型这个概念。

如果我们希望 hungryAnimals 的计算拥有懒加载或是立刻加载(eagerly)的选择权，使用一个不透明的元素类型为 any Animal 的 Collection 会发生编译错误，因为返回了两个不同基本类型的值。

![image-20220630130306325](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630130306325.png)

![image-20220630130357415](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630130357415.png)

我们可以用 any 替换 some，返回遵循 any Animal 协议的 any Collection 类型，提示这个 API 被调用时可以返回不同类型的值。

![image-20220630130545010](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630130545010.png)

限制主要关联类型的能力给不透明类型和存在主义类型提供了更多的表达能力，这个能力可以用在多种标准库协议中，例如 Collection，你也可以声明你自己的带有主要关联类型的协议。

使用不透明类型编写泛型代码必须依赖于抽象类型之间的关系，让我们来探讨一下如何确定并保证使用相关联协议的多个抽象类型之间的必要关系。

我们要给 Animal 协议新增一个关联类型 AnimalFeed 实体类型(动物进食的食物类型)，同时新增一个eat(:) 方法来告诉动物可以消费这种类型的食物。

![image-20220630131309999](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630131309999.png)

为了让事情变得更有趣，我将要介绍一个额外的复杂功能。在我们给动物喂食之前，我们必须种植合适的庄稼，并且收获庄稼产出的食物。这是第一部分实体类：

![image-20220630131748293](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630131748293.png)

Cow 吃 Hay，所以我们首先需要种一些 Hay，这样可以得到 Alfalfa，它能够产出 Hay，这种 Cow 能吃的食物。

这里是第二部分实体类：

![image-20220630132014917](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630132014917.png)

Chicken 吃 Scratch，所以我们首先种一些 Millet，可以产出 Scratch，然后喂给 Chicken。

我想将这两种相关的实体类型抽象出来，所以我可以实现一次 feedAnimal(:) 方法，就能同时喂养 Cow 和 Chicken，以及我之后可能会喂养的新的动物。

![image-20220630133327284](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630133327284.png)

因为 feedAnimal(:) 方法需要与 Animal 协议中的 eat(:) 方法共同作用，它在消费位置有一个关联类型，我将通过声明参数类型为 some Animal 的 feedAnimal(:) 方法来对存在主义类型进行拆包。

开始之前，我先用我们目前对协议和关联类型所知的内容声明几个协议 AnimalFeed 和 Crop。

AnimalFeed 有一个关联类型 CropType，它遵循 Crop 协议。Crop 有一个关联类型遵循 AnimalFeed。

![image-20220630133922382](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630133922382.png)

像之前那样，我们先看一组协议类型参数的图。

我们先看 AnimalFeed，每个协议都有一个类型 Self，代表遵循协议的实体类型。

![image-20220630134329982](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630134329982.png)

我们的协议有一个关联类型 CropType，遵循 Crop 协议。

![image-20220630134542175](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630134542175.png)

关联类型 CropType 有一个内嵌的关联类型 FeedType，遵循 AnimalFeed 协议，这个 AnimalFeed 也有一个内嵌的关联类型 CropType，遵循 Crop 协议，循环往复，关联类型在 AnimalFeed 与 Crop 之间互相遵循，不断切换，无限嵌套。

![image-20220630134846558](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630134846558.png)

对于 Crop 协议也是相同的情况，从遵循 Crop 协议的 Self 类型开始，有一个遵循 AnimalFeed 协议的关联类型 FeedType，这个关联类型有一个内嵌的关联类型 CropType，无限嵌套。

让我们看看这些协议是否正确地模型化了实体类型之间的关系。回想一下在喂养动物之前，我们需要种植庄稼，然后会产出正确的动物要进食的食物。grow() 是 AnimalFeed 协议中的一个静态方法，这意味着它必须被遵循 AnimalFeed 协议的类型直接调用，而不是遵循 AnimalFeed 协议的具体类型的实例对象值。我们需要写下遵循 AnimalFeed 协议的类型的名称，但是我们有的只是一个遵循 Animal 协议的某个具体的类型，与 AnimalFeed 是不同的协议。

我们可以用 type(of:) 方法得到 animal 实例的类型，我们知道它一定是遵循 Animal 协议的某个类型，Animal 有一个关联类型 FeedType，它遵循 AnimalFeed 协议。这个类可以被作为调用 grow() 方法的基本类型。

AnimalFeed 协议的 grow() 方法返回一个值，这个值的类型是 AnimalFeed 的嵌套关联类型 CropType。我们知道 CropType 是遵循 Crop 协议的，所以可以对 CropType 的实例调用 harvest() 方法，但是我会得到什么呢？

harvest() 被声明为返回一个遵循 Crop 协议的 FeedType 的关联类型。

在我们的例子中，因为调用是基于 (some Animal).FeedType.CropType 的，harvest() 方法会输出一个 (some Animal).FeedType.CropType.FeedType。

不幸的是，这是错误的类型。

对 some Animal 调用 eat() 方法期待的返回值类型是 (some Animal).FeedType，而不是 (some Animal).FeedType.CropType.FeedType。

![image-20220630143840680](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630143840680.png)

这个程序类型是有问题的。

![image-20220630163559858](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220630163559858.png)

这些协议的定义，并没有真实地保证如果我们从 AnimalFeed 类型开始，然后调用 grow() 和 harvest()，我们会得到与 AnimalFeed 开始时相同的类型，也就是我们所期待的动物进食食物的类型。

另一种理解它的方式是，这些协议的定义太宽泛了，它们并没有准确地模型化我们对这些实体类型之间关系的期望，为了理解这是为什么，我们看一下 Hay 和 Alfalfa 类型。



