# AJAX

AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。

AJAX 不是新的编程语言，而是一种使用现有标准的新方法。

AJAX 是与服务器交换数据并更新部分网页的艺术，**在不重新加载整个页面的情况下。**



- 我不想后端进行页面渲染
  - 占用服务器资源，模板引擎
    - 后端只需要提供数据（不需要结构和样式）
    - 节约数据传输的量（页面的渲染速度，节约流量，节省服务器开销）
  - 前端获取纯数据，然后利用JS对页面的操作进行渲染
- 可以避免获取新数据时通过浏览器发送请求而导致重新加载整个页面、
  - 无刷新的更新页面
  - 利用JS中的一个对象XMLHttpRequest 来发送请求

前后端分离，各司其职，提高效率





## 流程

1. 在浏览器中执行JS代码（通过js的XHR对象来发送请求）
2. js的代码肯定需要有服务器来提供
3. script标签解析将JS文件传入浏览器的JS解析器中解析



## XHR

创建AJAX请求的JS API

```js
let xhr=new XMLHttpRequest();
xhr.open('GET','/',true);
xhr.onreadystatechange = function() {
   if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
      fn.call(this, xhr.responseText);  
   }
 };
//发送当前的请求
xhr.send();
```


1. open(method, url, async) 方法需要三个参数:

　 - method：发送请求所使用的方法（GET或POST）；与POST相比，GET更简单也更快，并且在大部分情况下都能用；然而，在以下情况中，请使用POST请求：

无法使用缓存文件（更新服务器上的文件或数据库）
向服务器发送大量数据（POST 没有数据量限制）
发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
　 - url：规定服务器端脚本的 URL(该文件可以是任何类型的文件，比如 .txt 和 .xml，或者服务器脚本文件，比如 .asp 和 .php （在传回响应之前，能够在服务器上执行任务）)；

　 - async：规定应当对请求进行异步（true）或同步（false）处理；true是在等待服务器响应时执行其他脚本，当响应就绪后对响应进行处理；false是等待服务器响应再执行。

2. send() 方法可将请求送往服务器。

3. onreadystatechange：存有处理服务器响应的函数，每当 readyState 改变时，onreadystatechange 函数就会被执行。

4. readyState：存有服务器响应的状态信息。
    0: 请求未初始化（代理被创建，但尚未调用 open() 方法）
    1: 服务器连接已建立（open方法已经被调用）
    2: 请求已接收（send方法已经被调用，并且头部和状态已经可获得）
    3: 请求处理中（下载中，responseText 属性已经包含部分数据）
    4: 请求已完成，且响应已就绪（下载操作已完成）

5. responseText：获得字符串形式的响应数据。

6. setRequestHeader()：POST传数据时，用来添加 HTTP 头，然后send(data)，注意data格式；GET发送信息时直接加参数到url上就可以，比如url?a=a1&b=b1。



## JQuery-AJAX

```JS
$.ajax({
    url: '/login_ajax/',
    type: 'post',
    data: {
        picStream: re.target.result
    },
    success: function (data) {
        data = JSON.parse(data);
        if (data.status===200) {
            window.location = data.url
        }
        else {
            alert('传输失败')
        }
    }
})
```



## 原生JS利用XMLHttpRequest实现JQuery封装的$.ajax

```JS
function ajax(opts){
    //初始化以及配置
    let defaultOpts={
        url,
        type:'GET',
        contentType,
        data,
        timeout,
        success,
        error
    };
    let xhr=new XMLHttpRequest();
    opts=Object.assign(opts,defaultOpts);

    //发送请求
    if(opts.type=='GET'){
        //将data处理成queryString
        data=formatQueryString(opts.data);
        xhr.open(opts.type,opts.url+'?'+data,true);
        xhr.send();
    }else if(opts.type=='POST'){
        xhr.open(opts.type,opts.url,true);
        xhr.setRequestHeader('Content-type',opts.contentType?opts.contentType:'application/json');
        xhr.send(opts.data);
    }

    //设置有效时间
    setTimeout(()=>{
        xhr.abort();
    },opts.timeout);

    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status>=200 && xhr.status<300 || status==304){
                opts.success&&opts.success(xhr.responseText);
            }else{
                opts.error&&opts.error(xhr.status);
            }
        }
    }

    
    function formatQueryString(data){
        var arr=[];
        for(var name in data){
            arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));
        }
        arr.push(("v="+Math.random()).replace(".",""));
        return arr.join("&");
    }
}

```



