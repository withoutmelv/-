const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring');

const SESSION_DATA={}

//设置cookie的有效期限
const getCookieExpires=()=>{
    const d=new Date()
    d.setTime(d.getTime()+(24*60*60*1000))
    // console.log(d.toUTCString());
    return d.toGMTString()
}



//设置post data的获取
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

    //解析cookie
    req.cookie={}
    const cookiestr=req.headers.cookie||''
    // console.log("Cookie is",cookiestr);
    cookiestr.split(";").forEach(item => {
        if(!item){
            return 
        }
        const arr=item.split("=")
        const key=arr[0].trim()
        const val=arr[1].trim()
        req.cookie[key]=val
    });

    //解析session
    let needSetCookie=false
    let userId=req.cookie.userid
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId]={} 
        }
    }else{
        needSetCookie=true
        userId=`${Date.now()}_${Math.random()}`
        SESSION_DATA[userId]={} 
    }
    req.session=SESSION_DATA[userId]
    //处理postData
    getPostData(req).then(postData => {
        req.body = postData
        //处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
                }
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
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
                }
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