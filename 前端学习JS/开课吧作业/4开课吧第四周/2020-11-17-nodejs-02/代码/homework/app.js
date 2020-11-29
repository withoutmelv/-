const http = require('http');
const fs = require('fs');


const quotes = [

    '虽然我个子矮，但我发际线高啊！',

    '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',

    '善良没用，你得漂亮。',

    '好好活下去 每天都有新打击。',

    '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',

    '世上无难事 只要肯放弃。',

    '加油，你是最胖的！'
];

const server = http.createServer((req, res) => {

    // 处理静态的资源
    let url = req.url;
    // 如果当前这次请求是以 /public 开头的url，那么我们就把当前应用的 public 目录下对应的资源返回给客户端
    if (url.startsWith('/public')) {
        let content = fs.readFileSync('.' + url);

        res.end(content);
    }

    if (url.startsWith('/quote')) {

        res.setHeader('content-type', 'text/html;charset="utf-8"');

        let quote = quotes.sort(() => {
            return Math.random() - .5;
        })[0];
        
        res.end(quote);
    }
});

server.listen(8888);