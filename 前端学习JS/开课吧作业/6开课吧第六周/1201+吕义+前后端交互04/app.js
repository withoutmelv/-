const http=require('http');
const KoaStaticCache=require('koa-static-cache');
const Koa=require('koa');
const ioServer=require('socket.io');

const app=new Koa();

const httpServer=http.createServer(app.callback());

//koa静态代理
app.use(KoaStaticCache('./public',{
    prefix:'/public',
    gzip:true,
    dynamic:true
}));

//构建websocket服务器
const io=ioServer(httpServer);
let sockets=[];

//socket套接字（插座）-> client/server连接对象 -> 每一个socket都是一个client&server连接对象
io.on('connect',socket=>{
    console.log('有人通过websocket发送请求',socket.id);

    sockets.push(socket);

    socket.on('message',data=>{
        let chatData={
            time:new Date(),
            id:socket.id,
            ...data
        }
        socket.emit('chat',chatData);

        socket.broadcast.emit('chat',chatData);
    })
})

httpServer.listen(8888);