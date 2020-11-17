React核心API

​	Component//PureComponent

​	forwardRef/CreateRef	 DOM节点的引用

​	lazy+Suspense组件的懒加载s

​	memo //函数式组件纯组件

​	useCallback,useContext,useEffect====> HOOK

​	

​	1. createElement  (jsx===>vnode)   React

​	2. component		React

​	3. render   React-dom 将虚拟dom变为真实DOM





1. jsx是什么

   它是js的语法糖，使得我们可以使用js来表示视图

2. 为什么使用jsx

   1. 执行速度，不用调用原生js的createElement,编译器会自动调用babel-loader去编译JSX
   2. 类型安全
   3. 开发效率

3. 怎么使用