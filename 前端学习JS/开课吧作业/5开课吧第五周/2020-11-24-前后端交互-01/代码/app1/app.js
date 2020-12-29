const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const KoaBody = require('koa-body');


const app = new Koa();

app.use( KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}) );

const router = new KoaRouter();

router.get('/getData', async ctx => {
    ctx.body = {
        id: 1,
        username: 'haizi',
        gender: '未知'
    }
    
    // ctx.body = '<p>这是一段html字符串</p>';

    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         ctx.body = {
    //             id: 1,
    //             username: 'haizi',
    //             gender: '未知'
    //         }
    //         resolve();
    //     }, 5000);
    // })
});

router.post('/save', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/attachments',
        keepExtensions: true
    }
}), async ctx => {
    console.log('query', ctx.request.query);
    console.log('body', ctx.request.body);

    ctx.body = 'ok';
});

app.use(router.routes());

app.listen(8888);