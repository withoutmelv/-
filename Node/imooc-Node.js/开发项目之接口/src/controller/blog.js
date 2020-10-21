const getList=(author,keyword)=>{
    //先返回假数据但格式正确
    return [
        {
            id:1,
            title:'A',
            content:'内容A',
            createTime:1603094363916,
            author:'zhangsan'
        },
        {
            id:2,
            title:'B',
            content:'内容B',
            createTime:1603094410410,
            author:'lisi'
        }
    ]
}

const getDetail=(id)=>{
    return [
        {
            id:1,
            title:'A',
            content:'内容A',
            createTime:1603094363916,
            author:'zhangsan'
        },
        {
            id:2,
            title:'B',
            content:'内容B',
            createTime:1603094410410,
            author:'lisi'
        }
    ]
}

const newBlog=(blogData={})=>{
    console.log(blogData)
    //blogData是一个对象，包含title,content等属性
    return {
        id:3//新建博客插入到数据表中的id
    }
}

const updateBlog=(id,blogData={})=>{
    //id就是要更新博客的id
    return true
}

const deleteBlog=(id)=>{
    //id就是要删除博客的id
    console.log(id);
    return true
}

module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}