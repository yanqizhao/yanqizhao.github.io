# WWDC 22 - 110352 拥抱 Swift 泛型 第一次整理

大家好，我是 holly，来自 Swift 编译组，欢迎来到拥抱 Swift 泛型。

泛型是一个书写 Swift 抽象代码的基本工具，随着代码的演化发展，泛型是起到管理复杂性的关键。

抽象概念可以将思想从特定的细节中分离出来，在代码中，有很多种方式(途径)可以使用泛型(泛型都起到了作用)。

你可能经常使用到的一种抽象概念的形式就是将代码抽出来到一个函数或是一个局部变量，如果你想要多次使用同一功能或同一个值时，这是非常有用的。

当你把一个功能提取到一个函数里时，函数的细节就被抽出去(抽象化)了，而使用(调用)个抽象函数的代码，就可以表达所发生的事情，而不需要重复细节了。

在 Swift 中，你也可以将实体类型抽象出来，如果你有一系列的类型，它们使用了相同的思想，和不同的实现细节，你就可以写抽象的代码来实现所有这些实体类型。

今天，我们将通过模型化实体类型、确定一系列实体类型的通用能力、构建一个接口来表达(呈现)这些能力、深入了解如何使用这些接口来实现泛型的书写的步骤来向你展示泛型的具体使用场景。

![image-20220626140259410](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626140259410.png)

我们将通过构建一些代码来模拟一个农场的形式，一起探索 Swift 抽象工具的使用。



## Model with concrete types

让我们先来写几个实体类型吧。

首先创建一个叫做 Cow 的结构体，它有一个方法叫做 eat(food:)，接收一个 Hay 类型的参数。

Hay 是另一个结构体，它有一个**静态**方法叫做 grow() -> Alfalfa，可以种植一些能够长出 Hay 的庄稼 Alfalfa。

Alfalfa 结构体有一个方法 harvest() -> Hay 通过 Alfalfa 实例来收获 Hay。

最后，我们抽象出一个农场 Farm，它有一个方法 feed(animal:) 可以喂养奶牛。

feed(animal:) 方法可以通过首先种一些苜蓿 Alfalfa 来生产干草 Hay，然后收获干草 Hay ，最后用干草 Hay 来喂养奶牛 Cow 的方式实现。

这时，我就能在我的农场来饲养奶牛了。

![image-20220626141648138](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626141648138.png)



但是我想饲养更多的动物。

我可以添加更多的结构体来代表其他的动物，就像 Horse 马和 Chicken 鸡。

我想在农场上饲养奶牛，马，鸡。



### Overloads

我可以重载这个 feed(animal:) 方法分别来接收不同类型的参数，但是每个重载函数都会有一个相当类似的实现。

![image-20220626142527042](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626142527042.png)

当我添加更多的动物类型时，这将造成类似代码的堆积，基本上到处都是重复的代码。

当你发现自己写的重载代码有重复的实现时，就是概括归纳(抽象、重构)的预兆了。

基本上说，这些实现都很类似，因为(饲养)不同类型的动物在功能(喂养)上是相似的。



## Identify common capabilities

第二步，就是来确定动物类型的通用能力了。

我们已经构建了一系列动物类型了，它们都有一个能力，吃某一种食物。

每种类型的动物都有不同的进食方式，所以每个动物的 eat(food:) 方法都有不同的行为表现。

我们要做的就是允许抽象代码在调用的时候调同一个方法，也就是 eat(food:) 方法，在这个的同时，让这些抽象代码在 eat(food:) 方法中的行为表现不同，这取决于抽象代码所执行在的实体的具体类型。

抽象代码在不同的实体类型上可以表现不同能力的功能叫做多态，多态允许一份代码拥有多种行为表现，取决于代码是被如何使用的。

更恰当地说的话，多态本身就是不同形式的。

首先是函数的重载，根据传入参数类型的不同，同样的函数调用可以意味着不同的事物。重载被称为 ad-hoc(临时安排的、特别的、专门的) 多态，因为它并不是一个通用的解决方案。我们只是为了看到重载到底是如何一步步走向重复代码的。

下一步，是子类多态。代码在一个超类上去执行调用，实际上却会在运行时基于特定的子类而产生不同的表现。

最后是使用泛型来实现的确定(指定)参数的多态。

![image-20220628195428703](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220628195428703.png)



泛型代码使用类型参数，来允许书写一份代码与不同类型一起奏效(工作、运行)。而实体类型呢，则将作为实参进行传递。

我们早就已经把重载排除出局了，所以让我们尝试使用子类多态吧。



### Subtypes

代表子类关系的一种方式是使用类层级(用类替换结构体)。我们可以引入一个类叫做 Animal 动物。

![image-20220626145345481](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626145345481.png)

然后，我们将每种动物类型从结构体更改为类。

每个具体的动物类都继承自 Animal 动物这个超类并且重写 eat(food:) 方法。

现在，我们有一个抽象的基类 Animal 动物，可以代表我们每一个具体的动物类型。调用 Animal 动物的 eat(food:) 方法将会通过使用子类多态而调用到子类的具体实现，但这样还没完。

我们仍然没有补全 Animal 动物 eat(:food) 方法的参数类型，这份代码还有一些报错。

首先，使用类将强制我们使用引用类型语义，即使我们并不需要分享不同实例间的任何状态。这个策略也需要子类去重写基类中的方法。但是忘记重写基类方法只有在运行时才会被捕获。

但是对这个模型抽象的过程中更大的问题是每种子类动物都会食用不同类型的食物，这种依赖用类层级相当难以表达。(即 eat(food:) 方法中 food 参数的类型必须明确标明，但是因为每种动物所食用的食物都是不同的，所以很难明确写清楚)



#### Any

一种方式是让 eat(food:) 方法中食物的参数接收一个不具体(明确)的类型， 例如 Any。

![image-20220626150733935](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626150733935.png)

但是这种策略在子类实现中，仍然需要在运行时确定好准确的类型并传入，这样，在每个重写的方法中又一次出现了代码堆积。(只是把代码堆积的位置改变了而已)

![image-20220626150958877](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626150958877.png)

但是更重要的是，这份代码允许你不小心传入一个错误的食物类型，造成另一个只能在运行时才捕获的 bug。我们再试试别的方法吧。(即使你在调用的时候，传入的食物类型与实际期待的不符，也只会在运行时才会报错)



####  \<T\>

我们可以通过在超类 Animal 动物类上引入一种类型安全的类型参数的方式，来替代表达喂养动物所用食物的类型。

这种类型参数对每一个子类的食物喂养类型使用一个占位符，通过这种方式，Food 参数的类型必须被提升到 Animal 类的声明中才行。

![image-20220626152712935](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626152712935.png)

这看起来有点诡异，因为尽管动物需要食物来填饱肚子，但是进食并不是动物的主要目标，很多与动物相关的代码也许根本不关心它们吃什么食物。尽管如此，所有对 Animal 类的引用(也就是对 Animal 的实例化)都需要指明 Food 的类型。

举个例子，每个 Animal 的子类都需要在声明继承的代码中使用尖括号明确指出它的食物类型，如果我们添加更多需要明确指定的类型给每种 Animal，这种代码模板在每个使用 Animal 类的地方都将变得非常繁琐。

![image-20220626153746315](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626153746315.png)

所以我们上述的两种方式既低效，又不能正确地表达语义。

**根本问题是，类是一种数据类型，我们却想要尝试复杂化一个超类，然后让它代表实体类型的抽象思想。**

取而代之的是，我们想要构建一个能够代表类型的能力，但不需要这个能力实现的细节。

动物有两个常见的能力，每种动物都有一种具体的食物类型，和一种进食方式。



## Build an interface

我们可以构建一种接口来代表这两种能力。

在 Swift 中，使用协议来实现这种功能。

协议是一种抽象工具，描述了遵循它协议的类型的功能。使用协议，你可以把一个类所做的事情的构思与其具体的实现区分开来。一个类所做的事情的构思用接口来表达。

让我们将动物的能力使用协议接口来翻译一下。

协议的名称代表我们所描述的这种类型的分类(类别、范畴、种类)，所以我管这个协议叫“Animal 动物”。

每个能力都将映射到一个协议的必要条件(要求、接口、方法)上。

食物的具体类型将会映射为协议中的一个关联类型，就像类型参数一样，关联类型也是作为实体类型的占位符。

![image-20220626160017654](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626160017654.png)

关联类型的特别之处在于，它取决于遵循协议的那个类型的具体类型，这层关系是有保障的。所以对应到(每个)具体的动物类型的不同实例都有相同的食物类型。

接下来，进食的行为将会映射为一个方法。这个方法叫做 eat(food:)，它接收一个参数，喂养动物所需食物的类型。

![image-20220626160729154](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626160729154.png)

协议中并没有这个方法的实现，实体动物类型被要求去实现它(具体的动物类型才需要去实现它)。

现在，我们有一个动物协议，我们可以让每个实体动物类型都遵循它。

你可以对一个实体类型进行标记，在它的声明或者扩展中，代表它遵循了一个协议。

![image-20220626162949349](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626162949349.png)

协议并不仅限于类去遵循，我们也可以对结构体、枚举和 actors 使用协议。

当你写下这个协议遵循的标注，编译器将会检查实体类型是否实现了协议中要求的必要条件。

每个动物类型都必须实现 eat(food:) 这个方法，而且编译器可以推断出喂养所需食物的类型，因为它在参数列表中已经被使用(描述)过了(每个具体的类型对 eat 方法的实现里，都传入了具体的 food 参数的类型名称)。

Feed 也可以通过类型别名明确的写出。



## Write generic code

我们成功地确定了动物的通用能力，并且使用协议表达了这些能力。现在，我们可以开始书写泛型代码了。



### Generics

我们可以使用动物协议来实现农场的 feed(animal:) 方法，我们想写一种实现，可以对所有的动物实体类型都通用。

我们使用确定参数的多态，并且引入一个类型参数，当方法被调用的时候，类型参数会被替换为实体类型。

类型参数是用尖括号包裹并写在函数名称后面的，就像通常的变量和函数参数那样，你可以随意给参数类型命名。

并且就像任何其他的类型那样，你可以在函数体内使用类型参数的名称引用这个类型参数。

这里我声明了一个类型参数 A，并且使用 A 作为函数参数动物的类型。

![image-20220626164416814](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626164416814.png)

我们总是希望实体动物类型遵循动物协议，所以在尖括号包裹的 A 之后标注其遵循 Animal 协议。

![image-20220626165033294](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626165033294.png)

协议遵循可以写在尖括号里，也可以在语句末尾使用 where 语句声明，在这里你还可以指明不同类型参数之间的关系。

![image-20220626165151422](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626165151422.png)

命名类型参数(也就在用尖括号包裹的类型参数后标注协议遵循)和在语句末尾使用 wehre 语句是非常有力量的，因为它允许你写出复杂的~~必要条件~~(要求)与类型之间的关系。但是大多数的泛型函数不需要这样的通用性。

让我们把焦点放在 feed(animal:) 方法上。

类型参数 A 在参数列表中出现过一次，而 where 语句罗列出了类型参数的必要条件的遵循情况。

在这种情况下，命名类型参数和使用 where 语句让这个方法看起来过于复杂。

![image-20220626165501956](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626165501956.png)

这种泛型样式是相当常见的，所以有更简单的方式表达它。

不再明确写出类型参数，我们可以就协议的遵循情况通过写成 some Animal 来表达这个抽象类型，这种声明方式跟前面的是等价的，但是那些不必要的类型参数列表和 where 语句都消失了，因为我们并不需要它们所提供的这种表达形式，使用 some Animal 更加直接。因为它减少了语法干扰，还在参数声明的右半部分包含了关于动物参数的语义信息。

![image-20220626170002361](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626170002361.png)



#### some

让我们看看 some Animal 的语法。

some 暗示这里有某一个具体的类型，some 之后总是会跟着一个要遵循的协议。

在这个场景里，具体的类型必须遵循 Animal 协议，这允许我们在参数值上使用 Animal 协议中的必要条件(这允许我们对这个参数实例调用 Animal 协议中声明的方法)。

some 关键字可以在函数参数和返回值的类型中使用，如果你之前写过 SwiftUI 代码，你应该早就用过 some，在返回值的位置使用 some View。

返回值的类型 some View 跟这里恰恰是完全相同的概念。在 SwiftUI 的视图中，body 属性返回某个具体类型的视图，但是使用 body 属性的代码并不需要知道这个具体的类型是什么。

![image-20220626170932734](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626170932734.png)

让我们返回回去更好的理解一下一个(具体、特定、某一个)的抽象类型的概念。

代表一个具体的实体类型的占位符的抽象类型叫做“不透明类型”。

被替换的具体的实体类型叫做(underlying)基本类型，对于不透明类型的值，在值的使用范围内，基本类型是固定的。

这样，泛型代码使用的值就被保证了值每次被访问的时候，都会获取到相同的基本类型。

使用 some 关键字的类型，和一个用尖括号命名的类型参数，都声明了一个不透明类型。

![image-20220626173329398](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626173329398.png)

不透明类型在输入输出中都可以使用，所以它们可以声明在函数(方法)参数的位置，或是返回值的位置。

函数的箭头将这两个位置分为两部分。

![image-20220626173940091](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626173940091.png)

不透明类型的位置决定了程序的哪个部分可以看到抽象类型，以及程序的哪个部分决定实体类型。

命名类型参数总是声明在输入侧，所以调用者决定了基本类型，而实现使用了抽象类型。

![image-20220626174210668](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626174210668.png)

通常情况下，提供不透明参数或返回值类型的那部分程序，决定了基本类型；而使用这个值的那部分程序可以看到抽象类型。



让我们深入了解一下这是怎么运转起来的。跟着我们对参数和返回值的直觉走。

因为基本类型是通过一个值推断出来的，基本类型总是跟值一起出现在相同的位置。

对于一个局部变量来说，基本类型是通过右边的赋值操作推断出来的，这意味着有着不透明类型的局部变量总是需要一个初始值(这样才能推断出其基本类型)。

![image-20220626174951554](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626174951554.png)

如果你不给提供初始值，编译器将会报错。

![image-20220626175035323](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626175035323.png)

基本类型必须在变量的使用范围内被固定，所以对基本类型进行修改的尝试也会得出一个错误的结果。

![image-20220626175134539](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626175134539.png)

对于使用不透明类型的参数来说，基本类型是在被调用的位置传入的实参值推断出来的。

![image-20220626175314696](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626175314696.png)

##### Swift 5.7——参数位置使用 some

在参数位置使用 some 是 Swift 5.7 新增的功能。

![image-20220626175447382](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626175447382.png)

基本类型只需要在参数的使用范围内被固定，所以每次调用都可以提供一个类型不同的参数。

![image-20220626175640411](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626175640411.png)



##### 返回值位置使用 some

对不透明类型的返回值来说，基本类型是在函数实现中的返回值的位置进行推断的。

![image-20220626180718256](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626180718256.png)

有不透明类型返回值的方法或者计算属性，可以在程序的任何位置被调用，所以这个值的可用范围是全局的。这意味着，返回值的基本类型需要在所有的返回语句中保持一致。如果没有保持一致，编译器将会报错，基本类型返回值的类型不匹配。

![image-20220626181045890](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626181045890.png)

对于不透明类型的 SwiftUI View，ViewBuilder DSL 可以将控制流语句的每个分支都转换成拥有相同基本类型的返回值。

所以在这个场景下，我们可以使用 ViewBuilder DSL 来解决这个问题。在方法前写一个修饰符 @ViewBuilder，并且移除掉 return 语句，将会允许通过 ViewBuilder 的类型来为我们构建返回值类型。

![image-20220626181303429](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626181303429.png)



##### 举例说明

让我们回到 feedAnimal 方法吧。

我将会使用 some 在参数列表中，因为我并不需要在其他位置引用这个不透明类型的参数。当你需要在函数体中多次引用这个不透明类型时，也就是说类型参数的名称要能手到擒来。

举个例子，当我们给 Animal 协议添加另外一个关联值，Habitat。

![image-20220626181844443](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626181844443.png)

我们也许想要在农场上为某个指定的动物构建一个栖息地，这个场景下，返回值类型就依赖于这个具体的动物的类型了，所以我们在参数和返回值的位置都需要用到类型参数 A。

![image-20220626183735613](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626183735613.png)

另一个你需要多次引用不透明类型的常见的地方，是在泛型中。代码通常在泛型类型上声明一个类型参数，为一个存储属性使用类型参数，并且也给一个成员构造器传递参数。

![image-20220626184243060](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626184243060.png)

在不同的上下文中引用泛型类型，也需要你用尖括号明确指出类型参数(也就是说在同一个上下文范围内，明确指出一次应该就够了，之后编辑器可以推断出来)。在声明中的尖括号里的泛型可以帮助阐明如何使用一个泛型类型，**所以不透明类型必须总是被命名为泛型类型**。

![image-20220626190535609](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626190535609.png)

现在，让我们一起构造出 feed 方法的实现吧。



我们可以使用动物参数的类型来访问种植的庄稼类型，通过 Feed 的关联类型。我们调用 Feed.grow() 来获取庄稼实例，这个庄稼可以产出要用来喂动物进食的类型的食物。

![image-20220626190910250](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626190910250.png)

接下来，我们需要收割庄稼的产出，可以通过调用庄稼的一个方法 harvest()

![image-20220626191404371](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626191404371.png)

最后我们可以把产出的食物喂给动物吃，因为基本的动物类型是固定的，编译器知道植物类型(alfara)与产出食物类型(hay)，以及在多个方法之间调用的动物类型(cow)之间的关系。

![image-20220626191534121](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626191534121.png)

这些静态的关系可以让我们避免给动物喂错食物。

如果我们尝试使用没有被保证可以为这个动物喂养的食物类型，编译器就会告诉我们。

![image-20220626191900776](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626191900776.png)

想要学习其他的农场协议是如何定义，并用来表达喂养动物的类型和它所食用的植物之间关系的，请参考 110353

![image-20220626193714763](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626193714763.png)

最后，让我们添加一个 feedAll(animals:) 方法，接收一个数组作为参数，我知道元素类型需要遵循 Animal 协议，但是我希望这个数组可以存储不同类型的动物。

![image-20220626202924050](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626202924050.png)

让我们看看这里用不透明类型 some Animal 是否可行。

![image-20220626203030188](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626203030188.png)

使用 some 关键字，就意味着这个具体的基本类型不能发生改变，因为基本类型是固定的，数组中所有的元素都必须是相同的类型，所以，用 some Animal 描述数组元素的类型并不能准确表达我们的意图。因为我想要一个可以存储不同类型元素的数组。

![image-20220626203102314](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626203102314.png)

这里，我们需要的是一个可以代表任何动物的超类，我们可以使用 any Animal 来表示任意类型的动物。

![image-20220626203544327](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626203544327.png)

any 关键字表明这个类型可以存储任意类型的动物，基本类型在运行时也可以改变。

就像 some 关键字那样，any 关键字后也跟随着一个要遵循的协议，any Animal 是一个单一的静态类型，拥有动态存储任意动物实体类型的能力。这个能力允许我们对值类型使用**子类多态**。为了允许这个灵活的存储，any Animal 在内存中的存储有一个特殊的表达。

你可以把这种表达形式想像成一个盒子，有时候，值能够直接装进盒子。

![image-20220626204305609](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626204305609.png)

而另外一些值太大了盒子装不下，所以值需要在其他位置分配内存空间，盒子只是用一个指针指向这个空间。

![image-20220626204442868](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626204442868.png)

any Animal 这个静态类型可以动态存储任何实体类型这种行为被正式的称为**存在主义类型**。

![image-20220626204819602](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626204819602.png)

对不同实体类型使用相同表达的策略叫做类型擦除。

在编译时，实体类型的类型被擦除，直到运行时才被体现出来。

存在类型 any Animal 的这两个实例，有相同的静态类型(具体的静态类型是什么？)，但是不同的动态类型(具体的动态类型又是什么？)。

类型擦除消除了不同动物在类型级别的区别，这允许我们使用静态类型相同但动态类型不同的值。

![image-20220626205158501](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626205158501.png)

我们可以使用类型擦除来书写一个异源值类型数组，这正是我们在 feedAll(animals:) 方法中所需要的。



##### Swift 5.7——参数位置使用 any

![image-20220626205642059](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626205642059.png)

所以我们使用一个数组，用 any Animal 作为参数的类型，**对协议使用 any 关键字和关联类型(哪里使用关联类型了？)是 Swift 5.7 新增的功能**。

为了实现 feedAll(animals:) 方法，我们首先遍历这个 animals 数组。

![image-20220626205904465](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626205904465.png)

对于每个动物，我们都想调用 Animal 协议中的 eat(food:) 方法。

![image-20220626210014893](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626210014893.png)

为了调用这个方法，在这次遍历中，我们需要获取到具体的基本类型 Feed 的类型。

![image-20220626210159916](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626210159916.png)

但是一旦我们对 any Animal 调用 eat(food:) 方法，我们将会得到一个编译错误。

![image-20220626210358657](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626210358657.png)

因为我们消除了具体动物类型在编译时类型级别的区别，我们也消除了所有类型之间的关系，这些关系本身是依赖于具体的动物类型的，也包括关联类型。

**所以我们不知道这个类型的动物希望被喂什么类型的食物。为了能够依赖这些类型之间的关系，我们需要回到之前动物的具体类型仍然固定的上下文，不再直接对 any Animal 调用 eat(food:) 方法，我们需要调用可以接收 some Animal 的 feed 方法。**

![image-20220626211117177](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626211117177.png)

any Animal 跟 some Animal 是不同的，但是编译器可以通过“拆包”基本类型值的方式将 any Animal 的实例转换为 some Animal，并且把它直接传给 some Animal 参数。

**这个“拆包”实参的能力是 Swift 5. 7 新增的。**

![image-20220626211430157](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626211430157.png)

你可以把拆包看作是编译器打开了盒子并取出了存在其中的值。

some Animal 参数的使用范围内，这个值都有一个固定的基本类型。所以我们可以访问所有对基本类型的操作，包括访问关联类型。

这真的很酷，因为它允许我们在需要的时候选择灵活的存储(即类型擦除，装进盒子里)，同时也可以回到之前的拥有函数体内可使用范围的固定基本类型的静态类型系统完整表达的上下文。

大多数情况下，你并不需要去考虑拆包，因为它就是按照你期待的方式工作的，与对 any Animal 调用协议方法类似，就是对基本类型调用这个方法。

所以我们可以对每个动物都调用 feed(animal:) 方法，在那里，每次遍历我们都可以种植并且收割合适的庄稼来喂养具体的动物。

![image-20220626215127833](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626215127833.png)

在这个过程中，我们看到了 some 和 any 不同的能力。

使用 some，基本类型就是固定的，这允许你在泛型代码中依赖于固定的基本类型之间的关系，所以你有对 API 和协议关联类型的完整的访问权限。

使用 any，当你需要存储任意实体类型时，any 提供了类型擦除，允许你表达异源集合，表达基本类型的缺席，使用可选项，同时抽象实现细节。

![image-20220626215828321](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626215828321.png)

总而言之，默认情况下使用 some，当你想要存储任意类型的值时，将 some 改为 any。

使用这种方式，只在你需要存储灵活性时，付出类型擦除和语义限制的代价即可。

这个工作流程与默认书写 let 表示常量，直到你需要变量时类似。

在这个视频中，我们想要通过这个工作流程随着代码的演进来生成代码并且获得更多的功能。



我们从实体类型开始，随着代码获得更多的功能，我们发觉在不同的类型中的代码重复。从这里开始，我们确定了通用的能力，并且使用协议生成了这些能力，最后我们用 some 和 any 写了抽象代码，并且讨论了我们倾向于使用 some 来书写更具有表达性的代码。

想要更深入的构建协议和理解类型擦除，可以看 110353。

![image-20220626220750663](/Users/yanqizhao/Library/Application Support/typora-user-images/image-20220626220750663.png)