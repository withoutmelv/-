const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const http = require('http');
const KoaServerHttpProxy = require('koa-server-http-proxy')

const app = new Koa();

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();


router.get('/data1', async ctx => {
    ctx.body = '开课吧';
});

app.use(KoaServerHttpProxy('/server1', {
    target: 'http://localhost:8888',
    pathRewrite: {
        '^/server1': ''
    }
}));

// router.get('/server1/data1', async ctx => {
//     // ctx.body = '开课吧';
//     let rs = await myRequest({
//         path: '/data1'
//     });
//     ctx.body = rs;
// });

// router.get('/server-data2', async ctx => {
//     // ctx.body = '开课吧';
//     let rs = await myRequest({
//         path: '/data2'
//     });
//     ctx.body = rs;
// });

app.use(router.routes());

app.listen(9999);


// server2的代理请求的方法
function myRequest(opts) {
    return new Promise((resolve) => {
        const options = Object.assign({
            protocol: 'http:',
            hostname: 'localhost',
            port: 8888,
            path: '/',
            method: 'GET'
        }, opts);
        
        const req = http.request(options, (res) => {
            // console.log(res);
        
            let str = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                // console.log(`BODY: ${chunk}`);
                str += chunk.toString();
            });
            res.on('end', () => {
                console.log('数据接收完成', str);
                resolve(str);
            });
        });
        
        req.write('');
        req.end();
    })
}