const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new KoaRouter();

/**
 * 后端代理
 *  代理：你不方便做，让方便的人做，这个就是代理
 * 
 *  代理人是有要求的，就是我们当前的 server
 *  （同源策略）跨域问题只出现浏览器中
 *  node 的 http 模块也是可以发送 http 请求的，但是不受同源策略影响
 */

router.get('/data1', async ctx => {
    console.log('有人请求了');
    ctx.body = 'kkb';
});

router.post('/data2', KoaBody(), async ctx => {
    console.log('body', ctx.request.body);
    ctx.body = 'ok';
});

app.use(router.routes());

app.listen(8888);