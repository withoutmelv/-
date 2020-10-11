## 真实DOM与虚拟DOM

### 真实DOM的实现：

1. state数据
2. JSX模板
3. 数据+模板结合，生成真实的DOM来显示
4. state发生改变
5. 数据+模板结合，生成真实的DOM，替换原始的DOM

##### 缺陷：

第一次生成了一个完整的DOM片段

第二次生成了一个完整的DOM片段

第二次的DOM替换第一次的DOM，非常耗性能



### 改良

1. state数据

2. JSX模板

3. 数据+模板结合，生成真实的DOM来显示

4. state发生改变

5. 数据+模板生成真实的DOM并不直接替换原始的DOM

   `生成真实DOM的消耗要调用webApplication等API损耗较大`

6. 新的DOM和原始的DOM做对比，找差异（DocumentFragment）

7. 找出input框发生了变化

8. 只用新的DOM中的input元素，替换掉老的DOM的input元素

##### 缺陷

节约了直接替换整体DOM的性能

但是比对两个DOM有增加了新的消耗



### 虚拟DOM

1. state数据

2. JSX模板

3. 数据+模板结合，生成真实的DOM来显示

   `<div id="abc"><span>hello world</span></div>`

4. 生成虚拟DOM（虚拟DOM就是一个JS对象，用它来描述真实DOM）

   ```javascript
   这一步多损耗了性能但是代价很小
   
   ['div',{id:'abc'},['span',{},'hello world']]
   
   数组第一项表示DOM节点的标签名
   
   数组的第二项代表DOM节点的属性名，类名等属性
   
   数组的第三项代表DOM节点里面的内容      （套娃）DOM节点里面还是一个DOM节点
   ```

5. state发生变化

6. 数据+模板生成一个新的虚拟DOM （而不是真实的DOM）

   `极大提升了性能，仅仅创建了一个JS对象`

   `['div',{id:'abc'},['span',{},'byebye']]`

7. 比较原始虚拟DOM和新的虚拟DOM之间的区别

   `两个JS对象的比对代替了两个真实DOM的比对，极大的提升了性能`

8. 直接操作DOM，改变span的内容





## 深入了解虚拟DOM

1. state数据

2. JSX模板

   `JSX--->createElement('div',{id:'abc'},'item')--->js对象（虚拟DOM）--->真实的DOM`

   `createElement('div',{id:'abc'},createElement('span',{},'hello world'))`

3. 数据+模板结合，生成虚拟DOM（虚拟DOM就是一个JS对象，用它来描述真实DOM）

   `这一步多损耗了性能但是代价很小`

4. 用虚拟DOM的结构生成真实的DOM来显示

5. state发生变化

6. 数据+模板生成一个新的虚拟DOM （而不是真实的DOM）

   `极大提升了性能，仅仅创建了一个JS对象`

7. 比较原始虚拟DOM和新的虚拟DOM之间的区别

   `两个JS对象的比对代替了两个真实DOM的比对，极大的提升了性能`

8. 直接操作原始真实DOM，改变span的内容

#### 虚拟DOM的优点：

1. 性能提升了
2. 它使得跨端应用得以实现。React Native ,因为移动端没有真实的DOM节点。



### Diff算法

两个虚拟DOM之间的比对算法difference

![Diff比对](C:\Users\lenovo\Desktop\React学习笔记\Diff比对.png)

比对方式：同级比对，当同一级的两个节点不相同时，直接将该节点以及其子节点全部删除，使用新的虚拟DOM对应的节点。

#### setState设计成异步的原因

![setState异步](C:\Users\lenovo\Desktop\React学习笔记\setState异步.png)

当多次的setState间隔时间较短时，React会将三次setState合并成一次setState,只做一次虚拟DOM的比对,提高React底层的性能.

#### 虚拟DOM比对

![虚拟DOM比对](C:\Users\lenovo\Desktop\React学习笔记\虚拟DOM比对.png)

给每个DOM节点设置keys,当有新的DOM节点加入时,两个DOM可以根据keys来进行比对,这样大大提高了比对的效率.