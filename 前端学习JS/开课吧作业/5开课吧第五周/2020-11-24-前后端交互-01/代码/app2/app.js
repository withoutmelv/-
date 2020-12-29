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
});

router.post('/save', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/attachments',
        keepExtensions: true
    }
}), async ctx => {

    // ctx.request.files.attachment

    // 把上传成功后的当前这个图片的访问地址返回给 前端
    ctx.body = '图片在服务器访问地址或名称';
});

router.get('/getPhotos', async ctx => {
    // 从数据库中读取所有上传的图片记录数据，并返回给前端，前端通过ajax调用该接口
})

app.use(router.routes());

app.listen(8888);