const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const KoaStaticCache = require('koa-static-cache');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');

const app = new Koa();

// secret ：加密秘钥
const secret = 'kkb';
app.use(jwt({ secret }).unless({ path: [/^\/public/, /^\/login/] }));

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();


router.post('/login', async ctx => {
    // 验证用户，并发送授权信息

    let payload = {
        id: 1,
        username: 'zMouse'
    };

    // ctx.set('Authorization', JSON.stringify(payload));

    ctx.set('Authorization', jsonwebtoken.sign(payload, secret));

    ctx.body = '登录成功';
})

router.get('/mySecret', async ctx => {
    // 判断用户是否有权限（是否登录）
    let authorizationData = ctx.get('Authorization');
    console.log('authorizationData: ', authorizationData);

    console.log('ctx.state.user', ctx.state.user);

    if (ctx.state.user) {
        // let userInfo = JSON.parse(authorizationData);
        // if (userInfo.id == 1) {

        // }
        ctx.body = '这是我的小秘密 - 其实我很温柔';
    } else {
        ctx.body = '你没有权限';
    }
    

});

app.use(router.routes());

app.listen(8888);