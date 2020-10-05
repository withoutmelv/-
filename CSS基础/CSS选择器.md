#### 简单选择器

	- 通配选择器
	- 标签选择器
	- ID选择器
	- 类选择器



#### 复杂选择器

	- 属性选择器

1. **E[attr]**：只使用属性名，但没有确定任何属性值；
2. **E[attr="value"]**：指定属性名，并指定了该属性的属性值；
3. **E[attr~="value"]**：指定属性名，并且具有属性值，此属性值是一个词列表，并且以空格隔开，其中词列表中包含了一个value词，而且等号前面的“〜”不能不写；
4. **E[attr^="value"]**：指定了属性名，并且有属性值，属性值是以value开头的；
5. **E[attr$="value"]**：指定了属性名，并且有属性值，而且属性值是以value结束的；
6. **E[attr\*="value"]**：指定了属性名，并且有属性值，而且属值中包含了value；
7. **E[attr|="value"]**：指定了属性名，并且属性值是value或者以“value-”开头的值（比如说zh-cn）;

```html
<!-- HTML -->
  <p>
    <label>用户名：</label>
    <input name="username" value="tw" disabled>
  </p>
  <p>
    <label>密码：</label>
    <input type="password" required>
  </p>
  
  <!-- CSS -->
  <style>
    /* 选中所有的禁用的输入框 */
    input[disabled] {
      background: #ddd;
      color: #999;
      cursor: not-allowed;
    }
    /* 选中所有输入框类型为"密码"的元素 */
    input[type="password"] {
      border-color: red;
      color: red;
    }
  
  </style>
```

	- 伪类选择器

伪类用于选择DOM树之外的信息，或是不能用简单选择器进行表示的信息。前者包含那些匹配指定状态的元素，比如:visited，:active；后者包含那些满足一定逻辑条件的DOM树中的元素，比如:first-child，:first-of-type，:target。

| 属性         | 描述                                                         |
| ------------ | :----------------------------------------------------------- |
| :active      | 向被激活的元素添加样式。                                     |
| :focus       | 向拥有键盘输入焦点的元素添加样式。                           |
| :hover       | 当鼠标悬浮在元素上方时，向元素添加样式。                     |
| :link        | 向未被访问的链接添加样式。                                   |
| :visited     | 向已被访问的链接添加样式。                                   |
| :first-child | 向元素的第一个子元素添加样式。                               |
| :lang        | 向带有指定 lang 属性的元素添加样式。                         |
| :checked     | 可以用来定义选中（checked）的元素，比如单选按钮（radio）或多选按钮（checkbox） |

	- 基于DOM之外的信息去（比如根据用户和网页的交互）选择元素，示例如下：

```html
   a:link    { ... }   /* 未访问过的链接 */
   a:visited { ... }   /* 已访问过的链接 */
   
   a:hover   { ... }   /* 鼠标移到链接上的样式 */
   a:active  { ... }   /* 鼠标在连接上按下时的样式 */
   a:focus   { ... }   /* 获得焦点时的样式 */
   
   <!-- 伪类的代码示例 -->
   <!-- HTML -->
   <nav>
     <ul>
       <li><a href="http://w3.org">W3C</a>
       <li><a href="http://example.com">example.com</a>
       <li><a href="http://www.360.com">360</a>
     </ul>
   </nav>
   
   <label>搜索：<input name="q" type="search"></label>
   
   <!-- CSS -->
   <style>
     a:link {
       color: black;
     }
     a:visited {
       color: gray;
     }
     a:hover {
       color: orange;
     }
     a:active {
       color: red;
     }
     a:focus {
       outline: 2px solid red;
     }
   </style>
```

​	**a标签伪类超链接的顺序问题：**详情看 https://www.jianshu.com/p/1cb4eb9fea71

  - 由于伪类的选择器优先级一致，后面的a链接样式会覆盖前面的。

  - a伪类的顺序为：a:link > a:visited > a:hover > a:active

    也有人这么记a伪类的顺序：

    L-V-H-A

    即love & hate；



- 伪元素选择器

伪元素为DOM树没有定义的虚拟元素。不同于其他选择器，它不以元素为最小选择单元，它选择的是元素指定内容。比如`::before`表示选择元素内容的之前内容，也就是""；`::selection`表示选择元素被选中的内容。

在CSS3中，伪类与伪元素在语法上也有所区别，伪元素修改为以`::`开头。但因为历史原因，浏览器对以`:`开头的伪元素也继续支持，但建议规范书写为`::`开头。

| 属性           | 描述                           |
| -------------- | ------------------------------ |
| ::first-letter | 选择指定元素的第一个单词       |
| ::first-line   | 选择指定元素的第一行           |
| ::after        | 在指定元素的内容前面插入内容   |
| ::before       | 在指定元素的内容后面插入内容   |
| ::selection    | 选择指定元素中被用户选中的内容 |

```html
<h1>这是h1</h1>
<h2>这是h2</h2>

<!-- CSS -->
<style>
h1::before{
    content:"h1后插入内容"
}
h2::after{
    content:"none"
}
</style>
```

- 注意：

1. 伪元素要配合content属性一起使用
2. 伪元素不会出现在DOM中，所以不能通过js来操作，仅仅是在 CSS 渲染层加入
3. 伪元素的特效通常要使用:hover伪类样式来激活

###### **不同的选择器之间也可以组合。常用的选择器组合示例如下。**

###### 直接组合 EF

```html
     <!-- HTML -->
     <p class="warning">这是一条警告信息</p>
     <div class="warning icon">这是另外一条警告信息</div>
     
     <!-- CSS -->
     /* 标签选择器和类选择器组合 */
     p.warning { color: orange; }
```

###### 后代组合 E F

```html
      <!-- HTML -->
      <article>
        <h1>一级标题</h1>
        <p>第一段第一段。</p>
        <section>
          <h2>二级标题</h2>
          <p>第二段第二段。</p>
        </section>
      </article>
      
      <!-- CSS -->
      <style>
        /* 后代选择器 */
        /* 选中 article 标签下的 所有 p 元素 */
        article p {
          color: coral;
        }
        /* 选中 article 标签下的 section 标签下的 所有 h2 元素*/
        article section h2 {
          border-bottom: 1px dashed #999;
        }
      </style>
```

###### 亲子组合 E > F

```html
      <!-- HTML -->
      <article>
        <h1>一级标题</h1>
        <p>第一段第一段。</p>
        <section>
          <h2>二级标题</h2>
          <p>第二段第二段。</p>
        </section>
      </article>
      
      <!-- CSS -->
      <style>
        /* 亲子选择器 */
        /* 亲子选择器和后代选择器不同的就是：后代选择器可以选中嵌套在标签内部任意层级的标签元素，而亲子选择器只能选中当前标签向内一层的元素，即亲子选择器只能匹配直接后代，通俗一点，就是只能匹配儿子辈，不能匹配孙子辈。*/
        article > p {
          color: limegreen;
        }
      </style>
```

###### 还可以同时为一组选择器定义样式

```css
      /* 下面的选择器将会同时将CSS规则应用在body/h1/h2/h3/h4/h5/h6/ul/ol/li上 */
      body, h1, h2, h3, h4, h5, h6, ul, ol, li {
        margin: 0;
        padding: 0;
      }
      
      [type="checkbox"], [type="radio"] {
        box-sizing: border-box;
        padding: 0;
      }
```

