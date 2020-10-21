const mysql=require("mysql2");

//创建连接对象
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ctwlljh127925",
    port:"3306",
    database:"myblog"
})

//开始连接
con.connect()

//执行sql语句
const sql="update user set realname='李四' where username='lisi';"
con.query(sql,(err,result)=>{
    if(err){
        console.error(err)
        return 
    }
    console.log(result);
})

//关闭连接
con.end()