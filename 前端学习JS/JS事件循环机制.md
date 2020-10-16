## JS事件循环



JS的运行环境主要有两个：**浏览器**、**Node**。

在两个环境下的Event Loop实现是不一样的，在浏览器中基于 [规范](https://link.zhihu.com/?target=https%3A//www.w3.org/TR/2017/REC-html52-20171214/webappapis.html%23event-loops) Web API来实现，不同浏览器可能有小小区别。在Node中基于 [libuv](https://link.zhihu.com/?target=http%3A//libuv.org/) Node API这个库来实现

#### 事件循环Event Loop

程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）。

所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

#### 事件循环的具体过程

- 同步任务进入主线程，异步任务进入Event Table并注册函数。
- 当异步任务完成时，Event Table会将这个函数移入Event Queue。
- 主线程内的任务执行完毕执行栈为空，会去Event Queue读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。



**浏览器的Event Loop**

![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。



**Node.js的Event Loop**

Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境。

![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)

Node.js 在主线程里维护了一个**事件队列，**当接到请求后，就将该请求作为一个事件放入这个队列中，然后继续接收其他请求。当主线程空闲时(没有请求接入时)，就开始循环事件队列，检查队列中是否有要处理的事件，这时要分两种情况：如果是非 I/O 任务，就亲自处理，并通过回调函数返回到上层调用；如果是 I/O 任务，就从 **线程池** 中拿出一个线程来处理这个事件，并指定回调函数，然后继续循环队列中的其他事件。

简单的说node会在主线程空闲的时候，去查看事件队列中的事件是否发生了，如果发生了，就去执行对应的回调函数。

（1）V8引擎解析JavaScript脚本。

（2）解析后的代码，调用Node API。

（3）[libuv库](https://github.com/joyent/libuv)负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。

（4）V8引擎再将结果返回给用户。