const Koa = require('koa');
const KoaRouter = require('koa-router');
const nunjucks = require('nunjucks');
const mysql2 = require('mysql2');
const koaBody = require('koa-body');
const parsePath = require('parse-filepath');

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ctwlljh127925',
    database: 'kkb'
});

const app = new Koa();
const router = new KoaRouter();

// 配置模板引擎
nunjucks.configure('./templates', {
    watch: true,
    noCache: true
});

//get方式访问upload
router.get('/upload', async ctx => {
    ctx.body = nunjucks.render('upload.html');
});

//post方式提交upload中的数据
router.post('/upload', koaBody({
    // 设置 koaBody 能够解析 formdata 格式的数据
    multipart: true,
    // 设置上传的二进制文件的处理
    formidable: {
        // 上传的二进制文件存储在服务器中的位置
        // 上传后的文件名称是koabody自动重新命名的
        // 上传后文件名称尽量不要使用上传之前的原始文件的名称，因为会有覆盖的问题：c：1.jpg d: 1.jpg
        uploadDir: './attachments',
        keepExtensions: true
    }
}), async ctx => {
    // 数据库中存储的是文件上传以后在服务器里面的新名字
    let {size,type}=ctx.request.files.attach;
    let {base: filename} = parsePath(ctx.request.files.attach.path);

    if(size===0){
        ctx.body = nunjucks.render('message.html', {
            message: '<p>上传失败,请勿上传空文件</p><p><a href="/upload.html">重新上传</a>'
        });
        return;
    }

    let [rs] = await query(
        "INSERT INTO `attachments` (`filename`, `type`, `size`) VALUES (?, ?, ?)",
        [filename, type, size]
    );
    if(rs.affectedRows===1){
        ctx.body = nunjucks.render('message.html', {
            message: '<p>上传成功</p><p><a href="/upload.html">继续上传</a>'
        });
    }else{
        ctx.body = nunjucks.render('message.html', {
            message: '<p>上传失败</p><p><a href="/upload.html">重新上传</a>'
        });
    }
    
});

app.use(router.routes());


app.listen(8888);

function query(sql, prePared) {
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            prePared,
            function(err, results, fields) {
                if (err) {
                    reject(err); 
                } else {
                    resolve([results, fields]);
                }
            }
        ) 
    });
}