### `登录

- 核心：登录校验&登录信息存储



目录

- cookie和session
- session写入redis
- 开发登录功能，和前端联调(用到nginx反向代理)

cookie

- 什么是cookie
- js操作cookie，浏览器中查看coolie
- server端操作cookie，实现登录验证



什么是cookie

- 存储在浏览器的一段字符串（最大5kb）
- 跨域不共享
- 格式如k1=v1;k2=v2;k3=v3;因此可以存储结构化数据
- 每次发送http请求，会将请求域的cookie一起发送给server
- server可以修改cookie并返回给浏览器
- 浏览器也可以通过javascript修改cookie（有限制）

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201022093546329.png" alt="image-20201022093546329" style="zoom: 25%;" />

**淘宝请求百度的资源（图片，css等）会将百度的cookie放在http中发送给百度的server**

如果淘宝请求百度的资源，不是将百度的cookie而是淘宝自己的cookie发送给百度server，将会造成资源泄露。



客户端操作cookie

- 客户端查看cookie的三种方式
  - Network中点开Headers的Request Headers可以看到发送出去的cookie，Response Headers可以查看返回回来的set-cookie
  -  Application中Storage的Cookies查看
  - console控制台doucument.cookie
- js查看、修改cookie(有限制)
  - document.cookie="k1=200;k2=100;"直接累加而不是替换值



server端nodejs操作cookie

- 查看cookie
- 修改cookie
- 实现登录验证



session

- 上一节课的cookie会暴露username
- cookie中储存userid,server端对应username
- server中存在一个对象{userid:username}用于记录
- session 即server端存储用户信息

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201022111728904.png" alt="image-20201022111728904" style="zoom: 25%;" />

### 在项目中使用session带来的问题

- 目前session直接是JS变量，放在nodejs进程内存中

1. 进程内存有限，访问量过大，内存暴增怎么办
2. 正式线上运行是多进程，进程之间内存无法共享

<div>
    <img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201023150109311.png" alt="image-20201023150109311" style="zoom:50%; float:left" />
</div>
<div><img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201023150145644.png" alt="image-20201023150145644" style="zoom:50%;float:left" /></div>









































## 解决方案redis

- web server最常用的缓存数据库，数据存放在内存中
- 相比于mysql，访问速度快（内存和硬盘不是一个数量级的）
- 但是成本高，可存储数据量小
- 将web server 和redis拆分为两个单独的服务
- 双方都是独立的，都是可扩展的（例如都扩展成集群）
- 包括mysql,也是一个单独的服务，也可扩展

![image-20201023150933262](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201023150933262.png)

为什么session适用redis

- session访问频繁，对性能要求高
- session可不考虑断电丢失数据的问题（内存的硬伤）
- session数据量不会太大（相比于mysql中存储的数据）

为什么网站数据不适用redis

- 操作频率不是太高
- 断电不能丢失，必须保留
- 数据量太大，内存成本太高

