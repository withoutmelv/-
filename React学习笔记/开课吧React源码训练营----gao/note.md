第一天

jsx===babel-loader预编译===>React.createElement(类名或者html标签的string)===虚拟dom

函数组件 类组件 

函数组件性能高

createElement cloneElement



第二天

解析react类组件工作原理

Fragments

fiber

类组件

reconciliation协调

​	diff过程 对比虚拟dom 删除，替换，更新

![image-20201022201929444](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201022201929444.png)

// key标识了当前层级下节点的唯一性

// 判断节点能不能复用的前提是同一层级的key和type

// 区分<React.Fragment></React.Fragment>和<></>的区别

```js
function Node(props){
    return [1,2,3].map(item=>{
        <React.Fragment key={item}>
            <li></li>
        	<li></li>
        </React.Fragment>
    })
};
```



<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201022204909444.png" alt="image-20201022204909444" style="zoom:25%;" />

Fragment节点上的属性是怎么处理的

实现深比较算法

diff算法复杂度O(n)

- 同级比较 key
- 不考虑跨级复用



shouldComponentUpdate commentList



## Fiber

## Hook