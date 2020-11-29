let http =require('http')
let fs = require('fs')
const quotes = [
    '虽然我个子矮，但我发际线高啊！',
    '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',
    '善良没用，你得漂亮。',
    '好好活下去 每天都有新打击。',
    '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',
    '世上无难事 只要肯放弃。',
    '加油，你是最胖的！'
];
http.createServer((req,res)=>{
    let url=req.url;
    console.log(url);
    if(url==='/quote'){
        let random=Math.floor(Math.random()*quotes.length)
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        res.write(quotes[random])
        res.end()
    }else{
        fs.readFile(`.${url}`,(err,data)=>{
            if(err){
                return 
            }else{
                res.write(data);
                res.end()
            }
        })   
    }
    
}).listen(8888)