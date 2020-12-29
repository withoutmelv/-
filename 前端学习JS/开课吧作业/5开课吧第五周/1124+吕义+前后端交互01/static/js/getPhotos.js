let showPics=document.querySelector('.showPics');

const xhr = new XMLHttpRequest();

xhr.open('post', '/getPhotos', true);


let fd = new FormData();
xhr.onload = function() {
    console.log(xhr.responseText);
    let picContiner=xhr.responseText.split('&&');
    let imageBlock=`<div style='display:flex;justify-content:center;'>`
    showPics.innerHTML=imageBlock;
    console.log(picContiner);
    for(let i=0;i<picContiner.length-1;i++){
        showPics.innerHTML+=`<img src='${picContiner[i]}' width="200" height="200">`;
        
    }
}
xhr.send();
