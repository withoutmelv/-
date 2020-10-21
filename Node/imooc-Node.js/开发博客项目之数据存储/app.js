const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { resolve } = require('path')
const { rejects } = require('assert')
const user = require('./src/controller/user')

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        req.on('data', thunk => {
            postData += thunk.toString()
        })

        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //处理postData
    getPostData(req).then(postData => {
        req.body = postData
        //处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify({
                        blogData
                    })
                )
            })
            return
        }
        


        //处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData=>{
                res.end(
                    JSON.stringify(userData)
                )
            })
            return 
        }

        //未命中上面的路由
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write('404 NOT FOUND!')
        res.end()
    })


}

module.exports = serverHandle