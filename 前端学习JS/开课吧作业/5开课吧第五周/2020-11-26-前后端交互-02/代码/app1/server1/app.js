const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new KoaRouter();

router.get('/data1', async ctx => {

    // 可以准备一个白名单（whiteLists = ['http://localhost:9999', 'http://kaikeba.com']）
    // 获取到当前请求的客户端所在的源: 请求中的 Origin 头，与白名单进行比较

    ctx.set('Access-Control-Allow-Origin', '*');
    console.log('有人请求了');
    ctx.body = 'kkb';
});

router.post('/data2', KoaBody(), async ctx => {

    ctx.set('Access-Control-Allow-Origin', '*');

    console.log('body', ctx.request.body);

    ctx.body = 'ok';
});

router.options('/data2', async ctx => {
    console.log('/data2  的预检请求');

    // 我们要通过这次的预检请求返回一些特殊的头信息给客户端，客户端再根据返回的这些头信息，去处理那个非简单的请求是否能够正常处理

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'content-type');

    ctx.body = '';
})

app.use(router.routes());

app.listen(8888);