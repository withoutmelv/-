### Promise是什么

为什么要使用Promise

​	传统的异步操作很容易写成回调地狱，多层级嵌套，使得后续的维护和阅读都十分麻烦。

​	这时使用Promise链式调用，不仅可以使得代码便于阅读维护还可以。。。

#### MDN中文

	- Promise对象用于异步计算
	- 一个Promise表示一个现在，将来或者永不可用的值

#### 按用途来解释

- 主要用于异步计算
- 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
- 可以在对象之间传递和操作Promise，帮助我们处理队列。

#### JavaScript包含大量异步操作

异步操作可以避免界面冻结或者说是阻塞

![异步操作的定义](./异步操作的定义.png)

#### 异步操作的常见语法

事件侦听与响应：

```javascript
document.getElementById('start').addEventListener('click',start(),false);

function start(){
    //响应click事件，进行响应的操作
}

//jQuery用on()也是事件侦听
$('start').on('click',start);
```

回调：

```javascript
$.ajax('http://baidu.com',{
       success:function(){
           //回调函数
       }
});


//这种用法会在页面加载完毕后回调
//可以使用这种写法将script标签放在head中，因为函数会在页面的DOM加载完之后才执行
$(function(){
   //回调函数 
});
```

- 异步操作以事件为主
- 回调主要出现在Ajax和File API

### Node.js

特点：

	- 无阻塞高并发
	- 异步操作是其保障
	- 大量操作依赖系统回调函数
#### 回调有四个问题（陷入回调地狱）

- 嵌套层次很深，难以维护
- 无法正常使用return和throw，因为回调函数与主体函数不在同一个堆栈中
- 无法正常检索堆栈信息
- 多个回调之间难以建立联系，一个回调一旦开始启动就再也没有办法对它进行操作了



#### Promise详解

- Promise是一个代理对象，它和原先要进行的操作并无关系。
- Promise通过引入一个回调，避免更多的回调

- Promise有三个状态：
   - pending 待定 初始状态
   - fulfilled 实现 操作成功
   - rejected 被否决 操作失败

- Promise状态发生改变，就会触发.then里的响应函数处理后续步骤。

- Promise状态一经改变，不会再变。

![image-20201008184616766](./promise图解.png)

Promise异步调用的顺序以及node事件循环机制

```js
console.log(123)
const promise1 = new Promise((resolve, reject) => {
  console.log(456)
  resolve('foo');
});

promise1.then((value) => {
  console.log(value);
});

console.log(promise1);
//输出：123,456,Object,foo 
//因为resolve进入异步调用，主进程继续执行下面的代码。
//resolve之前的部分不属于异步调用的
```

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

1. 整体 script 作为第一个宏任务进入主线程，遇到 console.log，输出 script start
2. 遇到 setTimeout，其回调函数被分发到宏任务 Event Queue 中
3. 遇到 Promise，其 then函数被分到到微任务 Event Queue 中,记为 then1，之后又遇到了 then 函数，将其分到微任务 Event Queue 中，记为 then2
4. 遇到 console.log，输出 script end

至此，Event Queue 中存在三个任务，如下表：

| 宏任务     | 微任务 |
| ---------- | ------ |
| setTimeout | then1  |
| -          | then2  |

1. 执行微任务，首先执行then1，输出 promise1, 然后执行 then2，输出 promise2，这样就清空了所有微任务
2. 执行 setTimeout 任务，输出 setTimeout 至此，输出的顺序是：script start, script end, promise1, promise2, setTimeout





### .then()方法

.then方法里如果<mark>**不显式返回一个Promise**</mark> .then方法会默认返回一个空的Promise，但是会等待显式返回的Promise完成。例子：timeout3.js(everything 搜索)



- .then()接收两个函数作为参数,分别代表fulfilled和rejected
- .then()<mark>**默认返回一个新的Promise实例**</mark>，所以它可以链式调用
- 当前面的Promise状态改变时，.then()才能根据其状态，选择特定的状态响应函数
- 状态响应函数可以返回新的Promise或者其他值
  - 如果没有显式返回，则默认返回-----状态为fulfilled,值为undefined的Promise
  - <img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201110091303921.png" alt="image-20201110091303921" style="zoom:80%;" />
  - 如果返回的是其他值，则返回----状态为fulfilled,值为对应返回值的Promise
  - <img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201110091940883.png" alt="image-20201110091940883" style="zoom: 80%;" />
- 如果返回新的Promise,那么下一级的.then()会在新的Promise状态发生改变之后执行
- 如果返回其他任何值或者没有显示返回值，则会立即执行下一级的.then()，因为返回的Promise状态为fulfilled



### .then的层次嵌套改为链式调用

​	nested-then.js



## 问题：下面四种Promise的区别

```js
//doSomething和doSomethingElse都是返回Promise实例的函数
//#1
doSomething().then(function () {
    return doSomethingElse();
})
.then(finalHandler)

//#2
doSomething().then(function () {
    doSomethingElse();
})
.then(finalHandler)

//#3
doSomething().then(doSomethingElse())
.then(finalHandler)

//#4
doSomething().then(doSomethingElse)
.then(finalHandler)
```

问题一：

​	<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201110095753857.png" alt="image-20201110095753857" style="zoom:33%;" />

问题二：

​	<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201110095813639.png" alt="image-20201110095813639" style="zoom:33%;" />

问题三：

​	<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201110095842583.png" alt="image-20201110095842583" style="zoom:33%;" />

问题四：

​	<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201110095900107.png" alt="image-20201110095900107" style="zoom:33%;" />

​	

### 错误处理的两种做法

- `reject('错误信息').then(null,message=>{})`
- `throw new Error('错误信息').catch(message=>{})`
- 推荐使用第二种，更加清晰好读，可以捕获前面的错误。比如：Promise里面没出现错误，但是进入到then之后出现错误，使用第二种方法，catch还能捕获到。

注意：catch和then连用

- catch返回的也是Promise对象且默认状态为fulfilled,若是出现`throw new Error`那么Promise状态变为rejected
- 建议在所有队列最后都加上`.catch()`，以避免漏掉错误处理造成意想不到的问题



### Promise.all()

批量执行

- Promise.all([p1,p2,p3,....])用于将多个Promise实例，包装成一个新的Promise实例。
- 返回的实例就是普通的Promise
- 接收一个数组作为参数
- 数组里可以是Promise对象，也可以是别的值，只有Promise会等待状态改变
- 当所有子Promise都完成，该Promise完成，返回值是全部值的数组
- 有任何一个失败，该Promise失败，返回值是第一个失败的子Promise的结果

// all.js



### .map()

promise.all()最常见的就是和.map()连用

