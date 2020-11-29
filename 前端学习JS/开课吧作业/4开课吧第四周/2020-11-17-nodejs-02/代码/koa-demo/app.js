const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

// 只是初始化了一个 Koa Application 对象，并没有创建 http 服务，也没有监听端口
const server = new Koa();

const users = [
    {
        id: 1,
        name: 'zMouse'
    },
    {
        id: 2,
        name: 'haizi'
    }
]

// 静态代理
server.use( KoaStaticCache('./public', {
    prefix: '/public',
    // gzip 压缩
    gzip: true,
    // 有利于开发中的文件变更
    dynamic: true
}) );

// 动态处理
// server.use((ctx, next) => {
//     ctx.body = 'kkb';
// });

let router = new KoaRouter();

router.get('/', async ctx => {
//    ctx.body = '首页';

    ctx.body = users;
});

router.get('/:id(\\d+)', async ctx => {
    //    ctx.body = '首页';
    //  koa-router 会解析真实url中 :id 所表示的部分，并把解析后的结果转成一个对象，存储在 ctx.params
    
        ctx.body = users.find(user => user.id == ctx.params.id);
});

// router.get('/2', async ctx => {
//         ctx.body = users.find(user => user.id == 2);
// });

router.get('/register', async ctx => {
    ctx.body = '注册';
})

server.use( router.routes() );

// 启动了一个基于 http 的 webserver
server.listen(8888);