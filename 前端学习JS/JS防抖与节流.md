### JS防抖debounce与节流throttle

#### 概述

防抖就是**停止操作延迟多久执行回调函数**，最简单的例子就是**输入框打字搜索查人**，如果不用**防抖(debounce)**函数限制，试想一下，打一个字调一次接口，如果打字速度非常快，就会频繁的调用接口，一个是**服务端的开销会增加**，二是**前端的体验非常不好**，下拉框的数据一直在更新，所以就造成了**“抖动”**。我们想要的效果就是用户不打字时候我们才调用一次搜索查人的接口，那么我们怎么判定用户不再打字了，这时候就是**防抖(debounce)**函数的精髓延迟多久，如果距离用户敲击键盘 0.5 秒之后输入框不在变化，我们就认为用户打字完毕，如果用户一直在打字，我们就一直重置这个时间。

再来对比**节流**(throttle)函数，为什么不用节流，节流函数的核心就是多久执行一次，假设节流时间是 1 s, 意思就是不管用户是否还在打字，一开始开始会调用搜人接口，过了一秒又会调用一次搜人接口，明显不符合应用场景。



**一言以蔽之： 就交互场景而已～**
throttle 像是按钮的冷却时间，防止用户疯狂点击按钮提交表单不断的调用接口，我们限制 2 秒才发一次请求，不管你点击多少次；
debounce 像是搜索框的查询，等待用户完成操作再执行，避免打字期间就不断的查询。





## 正文



https://www.cnblogs.com/cc-freiheit/p/10827372.html  //参考博客连接

#### 准备材料

```html
<div id="content" style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;"></div>
 
<script>
    let num = 1;
    let content = document.getElementById('content');
 
    function count() {
        content.innerHTML = num++;
    };
    content.onmousemove = count;
</script>
```

这段代码， 在灰色区域内鼠标随便移动，就会持续触发 count() 函数，导致的效果如下：

![JS-debounce](C:\Users\lenovo\Desktop\文档\前端学习JS\JS-debounce.png)

　接下来我们通过防抖和节流限制频繁操作。

## 函数防抖（debounce）

　　短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。

```js
// 非立即执行版
function debounce(func, wait) {
    let timer;
    return function() {
      let context = this; // 注意 this 指向
      let args = arguments; // arguments中存着e
         
      if (timer) clearTimeout(timer);
 
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
}
```

　我们是这样使用的：

`content.onmousemove = debounce(count,1000);`

非立即执行版的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。效果如下：

![JS-debounce2](C:\Users\lenovo\Desktop\文档\前端学习JS\JS-debounce2.png)

```javascript
// 立即执行版
function debounce(func, wait) {
    let timer;
    return function() {
      let context = this; // 这边的 this 指向谁?
      let args = arguments; // arguments中存着e
 
      if (timer) clearTimeout(timer);
 
      let callNow = !timer;
 
      timer = setTimeout(() => {
        timer = null;
      }, wait)
 
      if (callNow) func.apply(context, args);
    }
}
```

立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。用法同上，效果如下：

![JS-debounce3](C:\Users\lenovo\Desktop\文档\前端学习JS\JS-debounce3.png)

```javascript
// 合成版
/**
   * @desc 函数防抖
   * @param func 目标函数
   * @param wait 延迟执行毫秒数
   * @param immediate true - 立即执行， false - 延迟执行
   */
function debounce(func, wait, immediate) {
    let timer;
    return function() {
      let context = this,
          args = arguments;
           
      if (timer) clearTimeout(timer);
      if (immediate) {
        let callNow = !timer;
        timer = setTimeout(() => {
          timer = null;
        }, wait);
        if (callNow) func.apply(context, args);
      } else {
        timer  = setTimeout(() => {
          func.apply
        }, wait)
      }
    }
}
```







## 节流(throttle)

　　指连续触发事件但是在 n 秒中只执行一次函数。即 2n 秒内执行 2 次... 。节流如字面意思，会稀释函数的执行频率。

　　同样有两个版本，时间戳和定时器版。

```javascript
// 时间戳版
function throttle(func, wait) {
    let previous = 0;
    return function() {
      let now = Date.now();
      let context = this;
      let args = arguments;
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    }
}
```

使用方式如下：

`content.onmousemove = throttle(count,1000);`

效果如下：

![JS-debounce4](C:\Users\lenovo\Desktop\文档\前端学习JS\JS-throttle.png)

　可以看到，在持续触发事件的过程中，函数会立即执行，并且每 1s 执行一次。



```javascript
// 定时器版
function throttle(func, wait) {
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
}
```

![JS-throttle2](C:\Users\lenovo\Desktop\文档\前端学习JS\JS-throttle2.png)

​		可以看到，在持续触发事件的过程中，函数不会立即执行，并且每 1s 执行一次，在停止触发事件后，函数还会再执行一次。

　　我们应该可以很容易的发现，其实时间戳版和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。

 

　　同样地，我们也可以将时间戳版和定时器版的节流函数结合起来，实现双剑合璧版的节流函数。

```javascript
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait, type) {
  if (type === 1) {
    let previous = 0;
  } else if (type === 2) {
    let timeout;
  }
  return function() {
    let context = this;
    let args = arguments;
    if (type === 1) {
        let now = Date.now();
 
        if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
        }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
  }
}
```

## 附录：

### 　　关于节流/防抖函数中 context（this） 的指向解析：

　　首先，在执行 throttle(count, 1000) 这行代码的时候，会有一个返回值，这个返回值是一个新的匿名函数，因此` content.onmousemove = throttle(count,1000);` 这句话最终可以这样理解：

```javascript
content.onmousemove = function() {
    let now = Date.now();
    let context = this;
    let args = arguments;
    ...
    console.log(this)
}
```

 　到这边为止，只是绑定了事件函数，还没有真正执行，而 this 的具体指向需要到真正运行时才能够确定下来。所以这个时候如果我们把前面的·`content.onmousemove `替换成 ` var fn` 并执行` fn  fn()` ，此时内部的 this 打印出来就会是 window 对象。

　　其次，当我们触发` onmousemove `事件的时候，才真正执行了上述的匿名函数，即  `content.onmousemove()` 。此时，上述的匿名函数的执行是通过  对象.函数名() 来完成的，那么函数内部的 this 自然指向 对象。

　　最后，匿名函数内部的` func `的调用方式如果是最普通的直接执行  `func() `，那么 `func` 内部的 this 必然指向 window ，虽然在代码简单的情况下看不出什么异常（结果表现和正常一样），但是这将会是一个隐藏 bug，不得不注意啊！所以，我们通过匿名函数捕获 this，然后通过 `func.apply()` 的方式，来达到` content.onmousemove = func `这样的效果。

可以说，高阶函数内部都要注意 this 的绑定。