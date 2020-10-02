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

   

#### 10月1日

1. leetcode：动态规划===秋叶收藏集

   https://leetcode-cn.com/problems/UlBDOe/solution/qiu-xie-shou-cang-ji-by-leetcode-solution/

   由于我们想要将收藏集中树叶的排列调整成「红、黄、红」三部分，因此我们可以用 3 个状态分别表示其中的每一部分，即状态 0 和状态 2 分别表示前面和后面的红色部分，状态 1 表示黄色部分。

   此时，我们就可以尝试使用动态规划解决本题了。我们用 f[i] [j]表示对于第 0 片到第 i 片叶子（记为 leaves[0..i]）进行调整操作，并且第 i 片叶子处于状态 j 时的最小操作次数。在推导状态转移方程时，我们可以分别对于每一种状态进行分析。

   状态转移方程：

   f[i] [0]=f[i-1] [0]+isYellow(i);

   f[i] [1]=Math.min(f[i-1] [0],f[i-1] [1])+isRed(i);

   f[i] [2]=Math.min(f[i-1] [1],f[i-1] [2])+isYellow(i);

   边界值f[0] [0]=isYellow(0)

   由于 因为每一种状态包含的叶子数量必须至少为 1，因此不仅需要特别注意 j=2 时的状态转移方程，还需要考虑每个状态本身是否是符合要求的。对于状态 f[i] [j] 而言，它包含了 leaves[0..i] 共 i+1 片叶子以及 j+1 个状态，因此<mark>叶子的数量必须大于等于状态的数量</mark>，即满足i≥j。这样一来，所有i<j 的状态 f[i] [j] 都是不符合要求的。观察上面的状态转移方程，我们在每一步转移时都是取最小值，因此我们可以将所有不符合要求的状态置为一个极大值（例如 n+1 或整数类型的上限等）。	

   同时需要注意的是，当i=0 时，f[i] [..] 会从f[i−1] [..] 转移而来，但后者是没有意义的，因此我们需要对 f[i] [..]进行特殊处理。由于当 i=0 时，j 也只能为 0，因此我们有：

   <mark>边界值f[0] [0]=isYellow(0)</mark>

   

2. 复习js防抖与节流



#### 10月2日

1. leetcode：将JS里面的map对象搞清楚

​		

