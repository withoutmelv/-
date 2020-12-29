const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const KoaBody = require('koa-body');
const fs = require('fs');
const mysql2 = require('mysql2');
const parsePath = require('parse-filepath');

// 数据库的链接
const conn = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ctwlljh127925',
    database: 'kkb'
});

// console.log(conn);

const app = new Koa();

const router = new KoaRouter();

app.use( KoaStaticCache('./static', {
    prefix: '/static',
    gzip: true,
    dynamic: true
}) );


router.get('/upload', async ctx => {
    // 访问到upload页面
    ctx.body = fs.readFileSync('./public/index.html').toString();
});

// 处理post方式提交过来的数据（上传的文件）
router.post('/upload', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './static/upload',
        keepExtensions: true
    }
}), async ctx => {
    // console.log('post成功');
    // 把上传的文件相关的数据记录保存到数据库指定表中
    let attachment = ctx.request.files.attachment;
    // 文件名解析
    let {base: filename} = parsePath(attachment.path);
    let {type, size} = attachment;

    await query(
        "INSERT INTO `photos` (`filename`,`type`,`size`) VALUES (?,?,?)",
        [filename, type, size]
    );

    ctx.body = `./static/upload/${filename}`;
});

router.get('/getPhotos', async ctx => {
    // 访问到upload页面
    // ctx.body = fs.readFileSync('./static/upload')
    ctx.body = fs.readFileSync('./public/getPhotos.html').toString();
});

router.post('/getPhotos', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './static/upload',
        keepExtensions: true
    }
}), async ctx=>{
    // console.log(123);
    let picContainer='';
    let rs=await query(
        "SELECT * FROM `photos`"
    );
    for(let i=0;i<rs.length;i++){
        picContainer+=`./static/upload/${rs[i].filename}`+'&&';
    }
    // console.log(picContainer);
    ctx.body = picContainer;
})

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