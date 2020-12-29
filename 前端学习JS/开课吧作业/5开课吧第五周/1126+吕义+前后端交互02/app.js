const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const koaBody = require('koa-body');
const fs = require('fs');
const mysql2 = require('mysql2');
const parsePath = require('parse-filepath');

const conn = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ctwlljh127925',
    database: 'kkb'
});

const app = new Koa();

// 数据库的链接

// secret ：加密秘钥
const secret = 'kkb';
app.use(jwt({ secret }).unless({ path: [/^\/public/, /^\/login/] }));

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));


const router = new KoaRouter();


router.post('/login', koaBody(),async ctx => {
    // 验证用户，并发送授权信息
    
    // console.log(ctx.request.body);
    let {username,password}=ctx.request.body;
    console.log(username,password);
    let rs=await query(
        "SELECT * FROM `users` WHERE `username`= ?",
        [username]
    );

    let payload = {
        username,
        password
    };

    // ctx.set('Authorization', JSON.stringify(payload));

    ctx.set('Authorization', jsonwebtoken.sign(payload, secret));
    console.log(rs);
    if(rs.length!==0&&rs[0].password===password){
        ctx.body = '登录成功';
    }else{
        ctx.body = '登录失败';
    }
    
})

router.get('/upload', async ctx => {
    // 访问到upload页面
    let authorizationData = ctx.get('Authorization');
    console.log('authorizationData: ', authorizationData);

    console.log('ctx.state.user', ctx.state.user);

    if (ctx.state.user) {
        ctx.body = '/public/upload.html';
    } else {
        ctx.body = '你没有权限';
    }
    
});

// 处理post方式提交过来的数据（上传的文件）
router.post('/upload', koaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/upload',
        keepExtensions: true
    }
}), async ctx => {

    let authorizationData = ctx.get('Authorization');
    console.log('authorizationData: ', authorizationData);

    console.log('ctx.state.user', ctx.state.user);

    if (ctx.state.user) {
        let attachment = ctx.request.files.attachment;
        // 文件名解析
        let {base: filename} = parsePath(attachment.path);
        let {type, size} = attachment;
        let {username} = ctx.state.user;
        await query(
            "INSERT INTO `photos` (`filename`,`type`,`size`,`username`) VALUES (?,?,?,?)",
            [filename, type, size,username]
        );

        ctx.body = `/public/upload/${filename}`;
    } else {
        ctx.body = '你没有权限';
    }
    
});

router.get('/getPhotos', async ctx => {
    // 访问到upload页面
    // ctx.body = fs.readFileSync('./static/upload')
    let authorizationData = ctx.get('Authorization');
    console.log('authorizationData: ', authorizationData);
    console.log('/getPhotos');
    console.log('ctx.state.user', ctx.state.user);
    if (ctx.state.user) {
        ctx.body = '/public/getPhotos.html';
    } else {
        ctx.body = '你没有权限';
    }
    
});

router.post('/getPhotos', koaBody(), async ctx=>{
    // console.log(123);
    let authorizationData = ctx.get('Authorization');
    // console.log('authorizationData: ', authorizationData);

    // console.log('ctx.state.user', ctx.state.user);

    if (ctx.state.user) {
        let picContainer='';
        let rs=await query(
            "SELECT * FROM `photos` WHERE `username`=?",
            [ctx.state.user.username]
        );
        for(let i=0;i<rs.length;i++){
            picContainer+=`/public/upload/${rs[i].filename}`+'&&';

        }
        // console.log(picContainer);
        ctx.body = picContainer;
    } else {
        ctx.body = '你没有权限';
    }
    
})












// router.get('/getPhotos', async ctx => {
//     // 判断用户是否有权限（是否登录）
//     let authorizationData = ctx.get('Authorization');
//     console.log('authorizationData: ', authorizationData);

//     console.log('ctx.state.user', ctx.state.user);

//     if (ctx.state.user) {
//         // let userInfo = JSON.parse(authorizationData);
//         // if (userInfo.id == 1) {

//         // }
//         ctx.body = '这是我的小秘密 - 其实我很温柔';
//     } else {
//         ctx.body = '你没有权限';
//     }
    

// });

app.use(router.routes());

app.listen(8888);


function query(sql, data) {
    return new Promise( (resolve, reject) => {
        conn.query(
            sql,
            data,
            (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results, fields);
                }
            }
        );
    } )
}