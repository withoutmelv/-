### Promise是什么

#### MDN中文

	- Promise对象用于异步计算
	- 一个Promise表示一个现在，将来或者永不可用的值

#### 按用途来解释

- 主要用于异步计算
- 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
- 可以在对象之间传递和操作Promise，帮助我们处理队列。

#### JavaScript包含大量异步操作

异步操作可以避免界面冻结或者说是阻塞

![异步操作的定义](C:\Users\lenovo\Desktop\文档\前端学习JS\异步操作的定义.png)

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
- 无法正常使用return和throw
- 无法正常检索堆栈信息
- 多个回调之间难以建立联系，一个回调一旦开始启动就再也没有办法对它进行操作了