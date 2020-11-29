//1.初始化
let xhr=new XMLHttpRequest();


//2.open(method,url,aysnc)
/**
 * 
 * aysnc默认为true
aysnc必需使用ture,选择异步方式
否则会采用同步方式导致堵塞
 */
xhr.open('GET','/',true);
//3.注册加载完成事件的回调函数，当接受完响应后开始执行
/**
 * xhr.onload可以替换成xhr.onreadystatechange
 * 这个回调函数里面利用xhr.readyState以及xhr.status状态码来检测当前进行到哪一步
 * xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
        fn.call(this, xhr.responseText);  
      }
    };
 */
xhr.onload=function(){
    //responseText返回的数据以文本形式呈现
    let rs=this.responseText;
}

//发送当前的请求
xhr.send();
