## 事件冒泡、事件捕获、阻止事件默认行为

参考连接

https://zhuanlan.zhihu.com/p/100831300

https://www.cnblogs.com/moqing/p/5590216.html

**1、事件捕获**
捕获型事件(event capturing)：事件从最不精确的对象(document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)

**2、事件冒泡**
冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。

可以想象把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。

![](https://img-blog.csdn.net/20160213232257842)





### 阻止事件冒泡

**一般设置在开始冒泡的子节点处**

1. e.stopPropagation() 标准的W3C 方式：
2. window.event.cancelBubble = true （谷歌，IE8兼容，火狐不支持）非标准的IE方式

```js
function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
   if ( e && e.stopPropagation )
      //因此它支持W3C的stopPropagation()方法
      e.stopPropagation();
  else
  //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
}
```

3. 合并取消：return false

在javascript的return false只会阻止默认行为，而是用jQuery的话则既阻止默认行为又防止对象冒泡。



### 取消事件捕获

```text
element.addEventListener(event, function, useCapture)
```

addEventListener方法用来为一个特定的元素绑定一个事件处理函数，是JavaScript中的常用方法，其传入三个参数，分别是‘没有on的事件类型’，‘事件处理函数’，‘控制事件阶段’，第三个参数是boolean类型，默认是false，表示在事件冒泡的阶段调用事件处理函数，像上图中传入true，就表示在事件捕获的阶段调用事件处理函数。



### 阻止事件的默认行为

某一元素的事件

1. 在W3c中，使用preventDefault（）方法；
2. 在IE下设置window.event.returnValue = false;

阻止a标签点击之后跳转的行为

```js
1 var $a = document.getElementsByTagName("a")[0];
2 $a.onclick = function(e){
3     alert("跳转动作被我阻止了")
4     e.preventDefault();
5     //return false;//也可以
6 }
```



