let btnElement = document.querySelector('.btn');
let attachmentElement = document.querySelector('#attachment');
let taskBodyElement = document.querySelector('.task_body');
let showUploadImage = document.querySelector('.content-list');
let taskPanel = document.querySelector(".task_panel");
let btn2 = document.querySelector('.btn2');

btnElement.onclick = function() {
    attachmentElement.click();
}

attachmentElement.onchange = function() {

    // console.log(attachmentElement.files);

    const xhr = new XMLHttpRequest();

    xhr.open('post', '/upload', true);


    let fd = new FormData();

    // xhr 下面的事件对应的是请求过程中的相关事件，请求：下载
    // xhr.onprogress = function() {
        // 客户端发送这次请求后，从服务器获取数据的进度过程
    // }
    xhr.onload = function() {
        // 把后端返回的图片地址动态添加到页面中

        //  <div class="content-list">
        // 	<!-- 在这里显示上传的图片 -->
        // </div>
        if(xhr.responseText==='你没有权限'){
            alert('你没有权限')
        }else{
            let imageBlock=`<img src='${xhr.responseText}' width="200" height="200">`;
            showUploadImage.innerHTML=imageBlock;
        }
        
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
    setTimeout(()=>{
        taskPanel.style.display="none";
    },1000)
    fd.append('attachment', attachmentElement.files[0]);
    let auth = localStorage.getItem("authorizationData");
    if (auth) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth);
    }
    xhr.send(fd);

}

// 当进入页面的时候，首先会调用 /getPhotos 接口从后端拿去到所有已经上传的图片数据，并显示在 content-list 中
btn2.onclick=function(){
    let xhr=new XMLHttpRequest();
    xhr.open('get','/getPhotos',true);
    xhr.onload=function(){
        if(this.responseText==='你没有权限'){
            alert('你没有权限');
        }else{
            window.location=`${this.responseText}`;
        }
    }
    let auth = localStorage.getItem("authorizationData");
    if (auth) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth);
    }
    xhr.send();
}