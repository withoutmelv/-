console.log('使用XHR对象来发送请求');

// 创建xhr对象
let xhr = new XMLHttpRequest();

// 请求前的准备工作
xhr.open('get', '/getData', true);

// 发送请求
xhr.send();

// 后端返回的数据不是交给浏览器了，而是交给了xhr这个对象，xhr会解析得到的数据，并存储到指定的位置：比如 xhr.responseText（解析成文本后的数据） / xhr.response（原始二进制数据）

// 为什么是空的？
// 因为 默认情况下（当前）是请求是异步的
// xhr 对象的请求是需要花时间，通常我们是用异步无阻塞的方式去发送这个请求的，请求不干扰主线程后续代码的执行
// setTimeout(() => {
//     console.log(xhr.responseText);
// }, 1000);

// 异步编程：事件回调
xhr.onload = function() {
    // 当xhr请求返回并解析完数据以后触发的事件
    console.log(this.responseText);
}