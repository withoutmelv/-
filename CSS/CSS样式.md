#### CSS中五种通用的字体系列都是什么？

1. Serif 字体
2. Sans-serif 字体
3. Monospace 字体
4. Cursive 字体
5. Fantasy 字体

#### 怎样设置多个字体，设置多个字体的时候要注意什么?

用逗号分隔开多个字体，在使用font-family时，英文字体放在中文字体前面，最后总是添加通用字体族。



### CSS字体

- 字体匹配算法简介如下：
  1. 浏览器先获取一个系统字体列表
  2. 对于元素中每一个字符，使用 font-family 属性及其它属性进行匹配，如果能匹配就暂定该字体
  3. 如果步骤2没有匹配上，选择下一个可选的 font-family 执行步骤2
  4. 如果匹配到一个字体，但是字体中没有该字符，继续对下一个可选的 font-family 执行步骤2
  5. 如果还没有匹配到字体，使用浏览器默认字体
- 通用字体族
  - Serif 衬线体：Georgia、宋体
  - Sans-Serif 无衬线体：Arial、Helvetica、黑体、微软雅黑
  - Cursive 手写体：Caflisch Script、楷体
  - Fantasy 梦幻字体：Comic Sans MS, Papyrus, Zapfino
  - Monospace 等宽字体：Consolas、Courier、中文字体
- 在使用font-family时，英文字体放在中文字体前面，最后总是添加通用字体族。