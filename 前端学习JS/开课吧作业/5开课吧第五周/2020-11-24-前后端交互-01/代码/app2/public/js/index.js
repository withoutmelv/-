let btnElement = document.querySelector('.btn');
let attachmentElement = document.querySelector('#attachment');
let taskBodyElement = document.querySelector('.task_body');

btnElement.onclick = function() {
    attachmentElement.click();
}

attachmentElement.onchange = function() {

    // console.log(attachmentElement.files);

    const xhr = new XMLHttpRequest();

    xhr.open('post', '/save', true);


    let fd = new FormData();

    // xhr 下面的事件对应的是请求过程中的相关事件，请求：下载
    // xhr.onprogress = function() {
        // 客户端发送这次请求后，从服务器获取数据的进度过程
    // }
    xhr.onload = function() {
        console.log(xhr.responseText);

        // 把后端返回的图片地址动态添加到页面中

        //  <div class="content-list">
        // 	<!-- 在这里显示上传的图片 -->
        // </div>
    }

    // 如果想监控上传的进度事件 upload
    // console.log(xhr.upload);

    let liElement = document.createElement('li');
    let spanElement = document.createElement('span');
    let taskProgressStatusElement = document.createElement('span');
    let progressElement = document.createElement('span');

    xhr.upload.onloadstart = function() {
        taskProgressStatusElement.classList.add('task-progress-status');
        taskProgressStatusElement.innerHTML = '开始上传……';
        progressElement.classList.add('progress');
        progressElement.style.width = '0%';

        liElement.appendChild(spanElement);
        liElement.appendChild(taskProgressStatusElement);
        liElement.appendChild(progressElement);

        taskBodyElement.appendChild(liElement);
    }

    xhr.upload.onprogress = function(e) {
        // e.total : 上传的总大小 
        // e.loaded : 已经上传的数据大小
        let v = (e.loaded / e.total * 100).toFixed(2);

        taskProgressStatusElement.innerHTML = v + '%';
        progressElement.style.width = v + '%';
    }

    fd.append('attachment', attachmentElement.files[0]);

    xhr.send(fd);

}

// 当进入页面的时候，首先会调用 /getPhotos 接口从后端拿去到所有已经上传的图片数据，并显示在 content-list 中
