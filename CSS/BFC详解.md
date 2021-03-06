## BFC的概念

BFC，块级格式化上下文，一个创建了新的BFC的盒子是独立布局的，盒子里面的子元素的样式不会影响到外面的元素。在同一个 BFC 中的两个毗邻的块级盒在垂直方向（和布局方向有关系）的 margin 会发生折叠。

1.规范解释

块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

2.通俗理解

BFC 是一个独立的布局环境,可以理解为一个容器,在这个容器中按照一定规则进行物品摆放,并且**不会影响其它环境中的物品**。

**如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。**

浮动元素会创建 BFC，则浮动元素内部子元素主要受该浮动元素影响，所以**两个浮动元素之间是互不影响的**。



## 创建BFC

- float的值不是none
- position 的值不是static或者relative
- display的值是非块级的块容器，像inline-block,table-cell,flex,table-caption或者inline-flex
- overflow的值不是visible



## BFC特性

　　1. 内部的box会在垂直方向，一个接一个地放置

　　2. box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

　　3. 内部每个元素的margin box的左边，与包含块border box的左边相接触，浮动也是如此

　　4. BFC的区域不会与float box重叠

　　5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

  6. 计算BFC的高度时，浮动元素也参与计算

     

## BFC的作用

- 可以清除浮动
- 防止发生margin折叠
- 更加方便的进行双栏布局

使得父元素包含子元素，常见的方式是为父元素设置overflow：hidden或者浮动父元素。根本原因在于创建BFC的元素，子浮动元素也会参与其高度计算，即不会产生高度塌陷问题

要阻止margin重叠，只要将俩个元素别放在一个BFC中即可

与浮动元素相邻的已生成BFC的元素不能与浮动元素互相覆盖。利用该特性可以作为多栏布局的一种实现方式. 特点在于左右俩栏的宽度固定，中间栏可以根据浏览器宽度自适应

