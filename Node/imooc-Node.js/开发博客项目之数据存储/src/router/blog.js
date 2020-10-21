const blog = require('../controller/blog');
const { getList,getDetail,newBlog,updateBlog,deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method//GET POST
    const id=req.query.id

    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result=getList(author,keyword)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }

    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result=getDetail(id)
        return result.then(detailData=>{
            if(detailData){
                return new SuccessModel(detailData)
            }else{
                return new ErrorModel('获取博客详情失败')
            }
            
        })
    }

    //新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author=req.body.author||"lvyi"//假数据，要等登录之后才能获取
        const result=newBlog(req.body)
        return result.then(blogData=>{
            return new SuccessModel(blogData)
        })
    }

    //更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result=updateBlog(id,req.body)
        return result.then(update=>{
            if(update){
                return new SuccessModel()
            }else{
                return new ErrorModel('更新博客失败')
            }
        }) 
    }

    //删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author="lvyi"
        const result=deleteBlog(id,author)
        return result.then(del=>{
            if(del){
                return new SuccessModel()
            }else{
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter