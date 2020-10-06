## 学习目标

- 理解CSS盒模型的具体概念
- 掌握margin折叠的发生情况和避免情况
- 掌握CSS盒模型相关的各属性

## 学习内容

- 在一个文档中，每个元素都被表示为一个矩形的盒子。每个盒子都有四个边：外边距边、边框边、内填充边与内容边。

![img](C:\Users\lenovo\Desktop\文档\CSS基础\CSS盒模型.jpg)

**盒模型允许在其它元素和周围元素边框之间的空间放置元素，针对不同的四边分别的说明如下：**

- Margin（外边距）- 清除边框外的区域，外边距是透明的
- Border（边框）- 围绕在内边距和内容外的边框
- Padding（内边距）- 清除内容周围的区域，内边距是透明的
- Content（内容）- 盒子的内容，可用来显示文本和各类型多媒体文件

**盒模型中的 width：**

- 指定content box的宽度
- 百分数相对于父容器（包含块）的content box宽度

**盒模型中的height：**

- 指定content box高度
- 百分数相对于父容器（包含块）的content box
- 高度只有当包含块的高度不依赖该元素时，百分比高度才生效

**盒模型中的padding：**

- 指内边距
- padding-top, padding-right, padding-bottom, padding-left
- 缩写：padding: top值, right值, bottom值, left值;（上-右-下-左）

**盒模型中的margin：**

- 指外边距
- margin-top, margin-right, margin-bottom, margin-left
-  缩写：margin: top值, right值, bottom值, left值;（上-右-下-左）

**margin折叠**

- 在CSS中，两个或多个相邻的普通文档流中的盒子（可能是父子元素，也可能是兄弟元素）在垂直方向上的外边距会发生叠加，这种情况下形成的外边距称之为margin折叠。
- 以下情况会发生margin折叠：
  - 都属于普通文档流的块级盒子且参与到相同的块级格式化上下文中
  - 没有被padding、border、clear和line box分隔开
  - 都属于垂直相邻盒子边缘：
    - 盒子的 margin-top 和它第一个普通文档流子元素的 margin-top
    - 盒子的 margin-bottom 和它下一个普通文档流兄弟的 margin-top
    - 盒子的 margin-bottom 和它父元素的 margin-bottom
    - 盒子的 margin-top 和 margin-bottom，且没有创建一个新的块级格式上下文，且有被计算为0的min-height，被计算为0或auto的height，且没有普通流子元素
- 那么如何避免margin折叠呢？（如前面所讲，margin折叠满足4个条件：两个或多个、相邻、普通文档流和垂直方向，因此只要破坏其中的任何一点就可以避免margin折叠了。）
  - 浮动元素不会与任何元素发生叠加，也包括它的子元素
  - 创建了 BFC 的元素不会和它的子元素发生外边距叠加
  - 绝对定位元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
  - inline-block 元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
  - 普通流中的块级元素的 margin-bottom 永远和它相邻的下一个块级元素的 margin-top 叠加，除非相邻的兄弟元素 clear
  - 普通流中的块级元素（没有 border-top、没有 padding-top）的 margin-top 和它的第一个普通流中的子元素（没有clear）发生 margin-top 叠加
  - 普通流中的块级元素（height为 auto、min-height为0、没有 border-bottom、没有 padding-bottom）和它的最后一个普通流中的子元素（没有自身发生margin叠加或clear）发生 margin-bottom叠加
  - 如果一个元素的 min-height 为0、没有 border、没有padding、高度为0或者auto、不包含子元素，那么它自身的外边距会发生叠加

**box-sizing：**

- 定义改变盒模型的计算方式 `border-box | content-box`
- 弄清元素宽高和元素内容的宽高
- border-box：这种情况下的元素的宽度或高度包含了元素的border、padding、内容的宽度或高度（此处的内容宽度或高度＝盒子的宽度或高度—边框—内距）

```css
// 设置给某一个div 的css样式
width: 100px;		//width,height指的是元素的宽高
height: 100px;
border: 1px solid;
padding: 0px 10px;
box-sizing: border-box;
```

![img](C:\Users\lenovo\Desktop\文档\CSS基础\border-box.png)

- content-box：元素的宽度和高度（width/height）等于元素边框宽度（border）加上元素内边距（padding）加上元素内容宽度或高度（content width/ height），也就是元素 `width/height = border + padding + content width / height`

```css
// 设置给某一个div 的css样式
width: 100px;		//width,height指的是元素内容的宽高
height: 100px;
border: 1px solid;
padding: 0px 10px;
box-sizing: content-box;
```

![img](https://s3.cn-north-1.amazonaws.com.cn/tws-upload/images/1548227245759-a708d7b2-6d02-4103-98d3-82628ed6c1df.png)

- 一些专家甚至建议所有的Web开发者们将所有的元素的box-sizing都设为border-box。
- 初始值：content-box

**border：**

- 边框的三个要素：
  - border-width：<length> | thin | medium | thick 
  - border-style: none | solid | dashed | dotted | double
  - border-color: <color>
- 四个方向：
  - border-left
  - border-top
  - border-right
  - border-bottom

**overflow：**

- 指的是溢出控制
- 取值：visible | hidden | scroll | auto

| 值      | 描述                                                     |
| ------- | -------------------------------------------------------- |
| visible | 默认值。内容不会被修剪，会呈现在元素框之外。             |
| hidden  | 内容会被修剪，并且其余内容是不可见的。                   |
| scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
| auto    | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |
| inherit | 规定应该从父元素继承 overflow 属性的值。                 |

- 初始值：visible

**visibility：**

- 该属性的目的是控制元素展示情况
- 取值：visible | hidden | collapse

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| visible  | 默认值。元素是可见的。                                       |
| hidden   | 元素是不可见的。                                             |
| collapse | 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。 |
| inherit  | 规定应该从父元素继承 visibility 属性的值。                   |

- 初始值：visible