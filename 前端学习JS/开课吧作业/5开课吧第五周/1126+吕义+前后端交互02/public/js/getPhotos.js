let showPics=document.querySelector('.showPics');

const xhr = new XMLHttpRequest();

xhr.open('post', '/getPhotos', true);


let fd = new FormData();
xhr.onload = function() {
    console.log(xhr.responseText);
    if(xhr.responseText==='你没有权限'){
        alert("你没有权限")
    }else{
        let picContiner=xhr.responseText.split('&&');
        let imageBlock=`<div style='display:flex;justify-content:center;'>`
        showPics.innerHTML=imageBlock;
        console.log(picContiner);
        for(let i=0;i<picContiner.length-1;i++){
            showPics.innerHTML+=`<img src='${picContiner[i]}' width="200" height="200">`;
        }
    }
    
}
let auth = localStorage.getItem("authorizationData");
if (auth) {
    xhr.setRequestHeader("Authorization", "Bearer " + auth);
}
xhr.send();
