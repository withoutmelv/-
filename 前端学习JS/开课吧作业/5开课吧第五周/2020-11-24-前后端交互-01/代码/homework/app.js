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
    password: '12345678',
    database: 'kkb'
});

// console.log(conn);

const app = new Koa();

const router = new KoaRouter();

router.get('/upload', async ctx => {
    // 访问到upload页面
    ctx.body = fs.readFileSync('./template/upload.html').toString();
});

// 处理post方式提交过来的数据（上传的文件）
router.post('/upload', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './attachments',
        keepExtensions: true
    }
}), async ctx => {

    // 把上传的文件相关的数据记录保存到数据库指定表中
    let attachment = ctx.request.files.attachment;

    // 文件名解析
    let {base: filename} = parsePath(attachment.path);
    let {type, size} = attachment;

    await query(
        "INSERT INTO `attachments` (`filename`,`type`,`size`) VALUES (?,?,?)",
        [filename, type, size]
    );

    ctx.body = '上传成功';

});

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