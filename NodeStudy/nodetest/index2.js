let http = require("http");
let querystring=require("querystring");
http.createServer((req, res) => {
    let result = []
    req.on('data', buffer => {
        //一般大一点的数据都是有很多段的数据
        //这里假装有多段数据发送过来
        result.push(buffer);
    })
    req.on('end', () => {
        let data=Buffer.concat(result);
        console.log(data);
    })
}).listen(8888)