let btns = document.querySelectorAll('button');

btns[0].onclick = function() {
    // 创建xhr对象
    let xhr = new XMLHttpRequest();

    // 请求前的准备工作

    // 如果是query，数据直接写在url后面
    xhr.open('post', '/save?a=1', true);

    xhr.onload = function() {

        console.log(this.responseText);
    }

    // post 等方式，需要从请求正文中传输数据到后端，那么这个数据通过 send 方法的第一个参数传入
    // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // xhr.send('username=haizi&gender=male');

    // xhr.setRequestHeader('content-type', 'application/json');
    // xhr.send('{"username":"haizi"}');

    // xhr.setRequestHeader('content-type', 'multipart/form-data');
    // xhr.send('{"username":"haizi"}');

    // 如果想发送formdata格式的数据，可以使用 js 内置的一个 FormData 对象来完成
    let fd = new FormData();
    fd.append('username', 'haizi');

    xhr.send(fd);
}

let n = 1;
btns[1].onclick = function() {
    console.log(n++);
    this.innerHTML = '为了好玩：' + n;
}