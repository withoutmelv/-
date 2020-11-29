$.ajax({
    url: '/login_ajax/',
    type: 'post',
    data: {
        picStream: re.target.result
    },
    success: function (data) {
        data = JSON.parse(data);
        if (data.status===200) {
            window.location = data.url
        }
        else {
            alert('传输失败')
        }
    }
})


//原生JS利用XMLHttpRequest实现JQuery封装的$.ajax
function ajax(opts){

    //初始化以及配置
    let defaultOpts={
        url,
        type:'GET',
        contentType,
        data,
        timeout,
        success,
        error
    };
    let xhr=new XMLHttpRequest();
    opts=Object.assign(opts,defaultOpts);

    //发送请求
    if(opts.type=='GET'){
        //将data处理成queryString
        data=formatQueryString(opts.data);
        xhr.open(opts.type,opts.url+'?'+data,true);
        xhr.send();
    }else if(opts.type=='POST'){
        xhr.open(opts.type,opts.url,true);
        xhr.setRequestHeader('Content-type',opts.contentType?opts.contentType:'application/json');
        xhr.send(opts.data);
    }

    //设置有效时间
    setTimeout(()=>{
        xhr.abort();
    },opts.timeout);

    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status>=200 && xhr.status<300 || status==304){
                opts.success&&opts.success(xhr.responseText);
            }else{
                opts.error&&opts.error(xhr.status);
            }
        }
    }

    
    function formatQueryString(data){
        var arr=[];
        for(var name in data){
            arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));
        }
        arr.push(("v="+Math.random()).replace(".",""));
        return arr.join("&");
    }
}
