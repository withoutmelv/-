let btnElement = document.querySelector('.btn');
let fileElement = document.querySelector('#file');
let contentList = document.querySelector('.content-list');
let taskPanel = document.querySelector('.task_panel');
let taskBody = document.querySelector('.task_body');

btnElement.onclick = function() {
    fileElement.click();
}

fileElement.onchange = function() {
    // 通过ajax来上传

    let xhr = new XMLHttpRequest();

    xhr.open('post', '/upload', true);

    let li = document.createElement('li');
    let span = document.createElement('span');
    let taskProgressStatusdiv = document.createElement('div');
    taskProgressStatusdiv.classList.add('task-progress-status');
    let progressDiv = document.createElement('div');
    progressDiv.classList.add('progress');
    progressDiv.style.width = '0%';
    li.appendChild(span);
    li.appendChild(taskProgressStatusdiv);
    li.appendChild(progressDiv);

    taskBody.appendChild(li);

    xhr.onload = function() {
        // console.log(xhr.responseText);
        let data = JSON.parse(xhr.responseText);

        let img = new Image();
        img.src = '/static/upload/' + data.filename;
        contentList.appendChild(img);
    }

    // 我们还可以通过ajax这个对象来监控上传的数据进度
    xhr.upload.onload = function() {
        taskPanel.style.display = 'none';
    }

    xhr.upload.onloadstart = function() {
        taskPanel.style.display = 'block';
    }

    xhr.upload.onprogress = function(e) {
        // 上传过程中不断触发
        // console.log(e);
        taskProgressStatusdiv.innerHTML = (e.loaded / e.total).toFixed(2) + '%';
        progressDiv.style.width = (e.loaded / e.total) + '%';
    }

    // 请求的正文数据，需要通过send方法的参数传入
    // xhr.send('a=1&b=2');

    // formData: 可以通过js内置的formData对象来构建formData格式的数据
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FormData
    let fd = new FormData();
    // fd.append('a', 1);
    // fd.append('b', 2);
    fd.append('attachment', fileElement.files[0]);
    xhr.send(fd);
}

// 页面每次重新载入或者刷新的时候，获取所有已经上传的图片，并显示在页面中
// todos
getPhotos();
function getPhotos() {
    let xhr = new XMLHttpRequest();

    xhr.open('get', '/getPhotos', true);

    xhr.onload = function() {
        let data = JSON.parse(xhr.responseText);



        // console.log('data', data);

        data.forEach( d => {
            let img = new Image();
            img.src = '/static/upload/' + d.filename;
            contentList.appendChild(img);
        } );

        
    }

    xhr.send();
}