### 搭建开发环境

- 从0开始搭建，不适用任何框架
- 使用nodemon监测文件变化，自动重启node
- 使用cross-env设置环境变量，兼容mac和linux和windows

### 开发接口

- 初始化路由：根据之前技术方案的设计，做出路由
- 返回假数据：将路由和数据处理分离，以符合设计原则

![](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201019150221207.png)

bin/www.js 服务器框架

app.js系统的基本设置

src/router只管路由匹配

src/controll数据的处理

src/model返回数据的格式

