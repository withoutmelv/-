### 构造函数与类创建实例

```javascript
// ES5构造函数
let Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};
const child = new Parent('听风是风', 26);
child.sayName() //'听风是风'


//ES6 class类
class Parent {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayName() {
        console.log(this.name);
    }
};
const child = new Parent('echo', 26);
child.sayName() //echo
```

但new不应该像一个黑盒，我们除了知道结果，更应该明白过程究竟如何。那么那么这篇文章主要围绕两点展开，**第一，js中new一个对象时到底发生了什么**，**第二，知道了原理后我们通过js来实现一个简单的new方法**。



### 一、new操作中发生了什么

比较直观的感觉，当我们new一个构造函数，得到的实例继承了**构造器的构造属性**(this.name这些)以及**原型上的属性**。

在《JavaScript模式》这本书中，new的过程说的比较直白，当我们new一个构造器，主要有三步：

> • 创建一个空对象，将它的引用赋给 this，继承函数的原型。
> • 通过 this 将属性和方法添加至这个对象
> • 最后返回 this 指向的新对象，也就是实例（如果没有手动返回其他的对象）

```javascript
// ES5构造函数
let Parent = function (name, age) {
    //1.创建一个新对象，赋予this，这一步是隐性的，
    // let this = {};
    //2.给this指向的对象赋予构造属性
    this.name = name;
    this.age = age;
    //3.如果没有手动返回对象，则默认返回this指向的这个对象，也是隐性的
    // return this;
};
const child = new Parent();
```

这应该不难理解，你应该在工作中看过类似下述代码中的操作，将this赋予一个新的变量(例如that)，最后返回这个变量：

```javascript
// ES5构造函数
let Parent = function (name, age) {
    let that = this;
    that.name = name;//不应该是this.name=name吗？我不是傻逼
    that.age = age;//this.age=age
    return that;
};
const child = new Parent('听风是风', '26');
```

为什么要这么写呢？我在前面说**this的创建与返回是隐性的**，但在工作中为了让构造过程更易可见与更易维护，所以才有了上述使用that代替this，同时手动返回that的做法；这也验证了隐性的这两步确实是存在的。

但上述这个解释我觉得不够完美，它只描述了构造器属性是如何塞给实例，没说原型上的属性是如何给实例继承的。

我在winter大神的重学前端专栏中，看到了比较符合我心意的，同时也是符合原理的描述：

> • 以构造器的prototype属性为原型，创建新对象；
>
> • 将this(也就是上一句中的新对象)和调用参数传给构造器，执行；
>
> • 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则舍弃掉第一步创建的新对象，返回手动return的对象。

到这里不管怎么说，你都应该大概知道了new过程中会**新建对象**，此对象会继承**构造器的原型与原型上的属性**，最后它会被**作为实例返回**这样一个过程。知道了原理，我们来手动实现一个简单的new方法。



### 二、实现一个简单的new方法

```javascript
// 构造器函数
let Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};
//自己定义的new方法
let newMethod = function (Parent, ...rest) {
    // 1.以构造器的prototype属性为原型，创建新对象；
    let child = Object.create(Parent.prototype);
    // 2.将this和调用参数传给构造器执行
    let result = Parent.apply(child, rest);
    // 3.如果构造器没有手动返回对象，则返回第一步的对象
    return typeof result  === 'object' ? result : child;
};
//创建实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent, 'echo', 26);
child.sayName() //'echo';

//最后检验，与使用new的效果相同
child instanceof Parent//true
child.hasOwnProperty('name')//true
child.hasOwnProperty('age')//true
child.hasOwnProperty('sayName')//false
```

那么到这里就介绍完毕了。

new一个构造函数默认返回什么？调用构造函数不使用new能得到实例吗？如果你对这些有兴趣，可以阅读博主这篇博客：

[精读JavaScript模式(三)，new一个构造函数究竟发生了什么？](https://www.cnblogs.com/echolun/p/10110839.html)

实例为什么能使用构造器prototype上的方法？继承之间的关系又是怎么样的？如果你对这些有兴趣，可以阅读博主这篇博客：

[精读JavaScript模式(八)，JS类式继承](https://www.cnblogs.com/echolun/p/10543760.html)

ES6新增的class类怎么用？与传统构造函数写法有哪些区别？如何快速上手class类？那你可以阅读博主这篇博客：

[es6入门5--class类的基本用法](https://www.cnblogs.com/echolun/p/10835901.html)

最后模拟实现new方法中，...rest是个什么参数？如果你对这个存疑，那怕是得了解下ES6中的取代arguments的rest参数，欢迎阅读这篇：

[es6入门3--箭头函数与形参等属性的拓展](https://www.cnblogs.com/echolun/p/10668186.html)