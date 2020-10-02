let http=require("http");
const { clearScreenDown } = require("readline");
let url=require('url');
http.createServer((req,res)=>{
    //console.log(req.url);
    // /aaa?username=lvyi&password=123456 queryString
    //console.log(url.parse(req.url,true));
    let {pathname,query}=url.parse(req.url,true);
    console.log(pathname,query);
}).listen(8888)