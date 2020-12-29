console.log('使用XHR对象来发送请求');

let btns = document.querySelectorAll('button');

btns[0].onclick = function() {
    // 创建xhr对象
    let xhr = new XMLHttpRequest();

    // 请求前的准备工作

    xhr.open('get', '/getData', false);

    // 发送请求
    // 同步阻塞，我的请求不完成，xhr的工作完成以后才继续向下执行
    xhr.send();

    // 我工作完成了，你再注册事件
    // xhr.onload = function() {
    //     console.log(this.responseText);
    // }

    console.log(xhr.responseText);
}

let n = 1;
btns[1].onclick = function() {
    console.log(n++);
    this.innerHTML = '为了好玩：' + n;
}