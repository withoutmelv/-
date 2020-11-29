const Koa = require('koa');
const KoaRouter = require('koa-router');
const nunjucks = require('nunjucks');
const mysql2 = require('mysql2');
const koaBody = require('koa-body');

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

//get方式访问register
router.get('/register', async ctx => {
    ctx.body = nunjucks.render('register.html');
});

//post方式提交register中的数据
router.post('/register', koaBody(), async ctx => {
    
    let {username, password} = ctx.request.body;
    
    if(!username){
        console.log(123);
        ctx.body = '<p>添加失败，用户名为空</p><p><a href="/register">继续添加</a></p>';
        return;    
    }
    let [repeat] = await query(
        "SELECT * FROM `users` WHERE `username`= ?",
        [username]
    );
    if(repeat.length===0){
        let [rs] = await query(
            "INSERT INTO `users` (`username`, `password`) VALUES (?, ?)",
            [username,password]
        );
        ctx.body = '<p>添加成功</p><p><a href="/register">继续添加</a></p>';
    }else{
        ctx.body = '<p>添加失败，用户名重复</p><p><a href="/register">继续添加</a></p>';
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