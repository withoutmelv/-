**由于margin的折叠这一块有点难以理解，故单独分出一个专题解析**

讲解的博客连接

https://tech.youzan.com/css-margin-collapse/   //下面的内容就是这篇博客的

https://www.cnblogs.com/hot-destiny/p/6285536.html

## margin 折叠

### 什么是外边距叠加

​	定义：

> *In CSS, the adjoining margins of two or more boxes (which might or might not be siblings) can combine to form a single margin. Margins that combine this way are said to collapse, and the resulting combined margin is called a collapsed margin.*

大概意思是：在CSS中，两个或多个毗邻的普通流中的盒子（可能是父子元素，也可能是兄弟元素）在垂直方向上的外边距会发生叠加，这种形成的外边距称之为外边距叠加。

我们可以注意定义中的几个关键字：`毗邻`、`两个或多个`、`垂直方向`和`普通流`。

### 毗邻

毗邻说明了他们的位置关系，没有被`padding`、`border`、`clear`和`line box`分隔开。

### 两个或多个

两个或多个盒子是指元素之间的相互影响，单个元素不会存在外边距叠加的情况。

### 垂直方向

> Horizontal margins never collapse.

只有垂直方向的外边距会发生外边距叠加。水平方向的外边距不存在叠加的情况。

### 普通流(in flow)

啥为普通流？`W3C`只对`out of flow`作了定义：

> An element is called out of flow if it is floated, absolutely positioned, or is the root element.An element is called in-flow if it is not out-of-flow.

从定义中我们可以知道只要不是`float`、`absolutely positioned`和`root element`时就是`in flow`。

## 什么时候会发生外边距叠加

外边距叠加存在两种情况：一是父子外边距叠加；二是兄弟外边距叠加。

`W3C`对于什么是毗邻的外边距也有定义：

> Two margins are adjoining if and only if: - both belong to in-flow block-level boxes that participate in the same block formatting context - no line boxes, no clearance, no padding and no border separate them - both belong to vertically-adjacent box edges, i.e. form one of the following pairs:
>
> - top margin of a box and top margin of its first in-flow child
> - bottom margin of box and top margin of its next in-flow following sibling
> - bottom margin of a last in-flow child and bottom margin of its parent if the parent has "auto" computed height
> - top and bottom margins of a box that does not establish a new block formatting context and that has zero computed "min-height", zero or "auto" computed "height", and no in-flow children

从定义中我们可以很清楚的知道要符合哪些情况才会发生外边距折叠：

- 都属于普通流的块级盒子且参与到相同的块级格式上下文中
- 没有被`padding`、`border`、`clear`和`line box`分隔开
- 都属于垂直毗邻盒子边缘：
  - 盒子的`top margin`和它第一个普通流子元素的`top margin`
  - 盒子的`bottom margin`和它下一个普通流兄弟的`top margin`
  - 盒子的`bottom margin`和它父元素的`bottom margin`
  - 盒子的`top margin`和`bottom margin`，且没有创建一个新的块级格式上下文，且有被计算为0的`min-height`，被计算为0或`auto`的`height`，且没有普通流子元素

**demo1：**

```html
.parent1 {
    height: 20px;
    background: yellow;
    margin-bottom: 20px;
}
.parent2 {
    margin: 20px 0 30px;
}
.parent3 {
    height: 20px;
    background: green;
    margin-top: 20px;
}
.child {
    background: red;
    height: 20px;
    margin: 40px 0 30px;
}

<div class="parent1"></div>  
<div class="parent2">  
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</div>  
<div class="parent3"></div>  
1234567891011121314151617181920212223242526
```

这个demo里的`.parent2`和第一个`.child`的`top margin`叠加，导致`.parent1`和`.parent2`之间的边距为`40px`。

**demo2：**

还是用上面的代码，`.parent2`中的`.child`中的`top margin`和`bottom margin`发生外边距叠加，它们之间的外边距为`40px`。

**demo3：**

还是上面的代码，`.parent2`中的最后一个`.child`发生`bottom margin`叠加，`.parent2`和`.parent3`之间的边距为`30px`。

**demo4：**

```html
.demo {
    height: 30px;
    background: red;
}
.margin-test {
    margin: 20px 0 30px;
}

<div class="container">  
    <div class="demo"></div>
    <div class="margin-test"></div>
    <div class="demo"></div>
</div>  
12345678910111213
```

这个demo是上面的第四种情况，元素自身的外边距`top`和`bottom`发生折叠，我们可以看出`.container`的高度为`90px`，这里可以看到`margin-test`的`top`和`bottom`外边距发生了折叠。

## 如何避免外边距叠加

上面讲了外边距的叠加，那如何避免呢，其实只要破坏上面讲到的四个条件中的任何一个即可：`毗邻`、`两个或多个`、`普通流`和`垂直方向`。

`W3C`也对此做了总结：

- Margins between a floated box and any other box do not collapse (not even between a float and its in-flow children).
- Margins of elements that establish new block formatting contexts (such as floats and elements with "overflow" other than "visible") do not collapse with their in-flow children.
- Margins of absolutely positioned boxes do not collapse (not even with their in-flow children).
- Margins of inline-block boxes do not collapse (not even with their in-flow children).
- The bottom margin of an in-flow block-level element always collapses with the top margin of its next in-flow block-level sibling, unless that sibling has clearance.
- The top margin of an in-flow block element collapses with its first in-flow block-level child"s top margin if the element has no top border, no top padding, and the child has no clearance.
- The bottom margin of an in-flow block box with a "height" of "auto" and a "min-height" of zero collapses with its last in-flow block-level child"s bottom margin if the box has no bottom padding and no bottom border and the child"s bottom margin does not collapse with a top margin that has clearance.
- A box"s own margins collapse if the "min-height" property is zero, and it has neither top or bottom borders nor top or bottom padding, and it has a "height" of either 0 or "auto", and it does not contain a line box, and all of its in-flow children"s margins (if any) collapse.

英语不好，翻译一下：

- 浮动元素不会与任何元素发生叠加，也包括它的子元素
- 创建了BFC的元素不会和它的子元素发生外边距叠加
- 绝对定位元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
- inline-block元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
- 普通流中的块级元素（没有border-top、没有padding-top）的margin-top和它的第一个普通流中的子元素（没有clear）发生margin-top叠加
- 普通流中的块级元素的margin-bottom永远和它相邻的下一个块级元素的margin-top叠加，除非相邻的兄弟元素clear
- 普通流中的块级元素（height为auto、min-height为0、没有border-bottom、没有padding-bottom）和它的最后一个普通流中的子元素（没有自身发生margin叠加或clear）发生margin-bottom叠加
- 如果一个元素的min-height为0、没有border、没有padding、高度为0或者auto、不包含子元素，那么它自身的外边距会发生叠加