const redis=require('redis')
const {REDIS_CONF} =require("../conf/db")

const redisClient=redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',err=>{
    console.error(err)
})

function set(key,val){
    //redis设置的都是字符串类型的数据
    if(typeof val =='object'){
        JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}

function get(key){
    const promise=new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if(val===null){
                resolve(null)
                return 
            }

            try{
                //是JSON的话返回JSON对象
                resolve(
                    JSON.parse(val)
                )
            }catch(err){
                //不是的话直接返回
                resolve(val)
            }
        })
    })
}

module.exports={
    set,
    get
}