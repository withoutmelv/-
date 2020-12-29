## axios



**Interceptors拦截器**

**koa-middleware中间件**

​	框架的中间层部分注入外部动作

**axios-interceptors拦截器**

​	框架axios请求之前和响应之后层部分注入的外部动作



```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```



## 源码大致逻辑

new Axios()=>request()=>处理请求和响应的拦截器=>

​		chain=[rs2,rf2,rs1,rf1,dispatchRequest,undefined,ps1,pf1,ps2,pf2]

调用请求拦截器函数=>dispatchRequest()=>adapter()请求=>调用响应拦截器

=>用户逻辑

