const { exec } = require('../db/mysql')

//xxx.html          ? a=100 &v1=k1 &v2=k2 &v3=k3
//select*fromblogs where 1=1   and author=''   and keyword=''
const getList = (author, keyword) => {
    //先返回假数据但格式正确
    //1=1是为了将where写在第一行并防止author和keyword出问题后sql语句出错
    let sql = `select * from blogs where 1=1 `//注意结尾留一个空格
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //返回Promise
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`
    return exec(sql).then(row => {
        return row[0]
    })
}

const newBlog = (blogData = {}) => {
    const { title, content, author } = blogData
    let sql = `insert into blogs (title,content,createtime,author) 
    values ('${title}','${content}',${Date.now()},'${author}');`
    //blogData是一个对象，包含title,content等属性
    return exec(sql).then(insertData=>{
        return {
            id:insertData.insertId||0
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    //id就是要更新博客的id
    //blogData是一个博客对象,包含title content属性
    const {title,content}=blogData
    const sql=`update blogs set title='${title}',content='${content}' where id=${id};`

    return exec(sql).then(updateData=>{
        if(updateData.affectedRows>0){
            return true
        }
        return false
    })
}

const deleteBlog = (id,author) => {
    //id就是要删除博客的id
    console.log(id,author);
    const sql=`delete from blogs where id=${id} and author='${author}';`
    return exec(sql).then(deleteData=>{
        if(deleteData.affectedRows>0){
           return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}