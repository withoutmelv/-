let btns = document.querySelectorAll('button');

btns[0].onclick = function() {
    // 创建xhr对象
    let xhr = new XMLHttpRequest();

    // 请求前的准备工作

    xhr.open('get', '/getData', true);

    xhr.onload = function() {
        // responseText 这里存储的类型永远永远都是一个字符串类型，有时候会是一个特殊格式的字符串，如：json
        // console.log(this.responseText);

        // console.log(this.responseType);

        // 后端会返回各种各样数据，方便我们前端js进行处理，包括text，html，xml，json
        // let data = JSON.parse(this.responseText);

        // console.log(data);

        let header= this.getResponseHeader('content-type');
        console.log(header);

        if (header.includes('json')) {
            let data = JSON.parse(this.responseText);
            console.log(data);
        }
        // 其它头的处理
    }

    xhr.send();
}

let n = 1;
btns[1].onclick = function() {
    console.log(n++);
    this.innerHTML = '为了好玩：' + n;
}