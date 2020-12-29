const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

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

app.use(router.routes());

app.listen(9999);