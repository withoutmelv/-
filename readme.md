### 9月28日

1. leetcode里面的题目：在对队列进行遍历操作时若是要改变队列长度，记得在循环外边先将长度固定，否则循环次数`queue.length`会随着每次的改变而变动。 

2. js数组的API像slice不会改变原数组而是返回子数组，splice才会改变原数组

3. 每日http指南:

    	1. 媒体类型MIME，它是一种文本标记，表示一种主要的对象类型和一个特定的子类型，中间由一条斜杠来分隔。

    2. URI分为URL和URN，主要使用URL，URN还处于实验阶段
    3. URL分为三部分：
     	1. 第一部分为方案，说明了访问资源所使用的协议类型。HTTP协议
      	2. 第二部分给出了服务器的因特网地址
      	3. 其余部分指定了web服务器上的某个资源

### 9月29日

1. leetcode：二叉树的遍历不准用递归，实现前中后序遍历。
2. js new关键字干了什么，实现模拟new关键字。
3. JS基本类型和引用类型

#### 9月30日

1. leetcode：搜索二叉树的定义--------
   - 若是一个节点有左子树，那么左子树上所有节点的值小于该根节点
   - 若是一个节点上有右子树，那么右子树上所有节点的值大于该根节点
   - 它的左右子树也为二叉搜索树
   
2. 立即执行函数`(function(x){})(i)//i是接收传给x的参数`

   ```javascript
   for(var i=0;i<10;i++){
   	(function(x){
   		setTimeout(function(){
   			console.log(x++);
   		},1000)
   	})(i);
   }
   ```


3. JS传递参数，传递的是数据的值而非按引用传递的

   ```javascript
   function setName(obj){
       obj.name="lvyi";
   }
   var person=new Object();
   setName(person);
   alert(person.name);//lvyi
   ```

   ```javascript
   function setName(obj){//传入的是值而非引用
       obj.name="lvyi";
       obj=new Object();//局部变量，在函数执行完后自动销毁
       obj.name="sb";
   }
   var person=new Object();
   setName(person);
   alert(person.name);//lvyi||如果是传入引用的话，此处值应该为sb
   ```

   

