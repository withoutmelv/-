#### 如何在HTML中引用CSS

- 外链

```html
<link rel="stylesheet" href="/path/to/style.css">
```

- 嵌入

```html
<style type="text/css">
    li{}
    p{}
</style>
```

- 内联

```html
<p style="margin:1 em 0">Example Content</p>
```

#### CSS中基本长度单位

- 绝对单位：

  - px：像素，对应显示器的一个像素点
  - in：英寸
  - 英寸cm：厘米
  - 厘米mm：毫米
  - 毫米pt：磅 (1 pt 等于 1/72 英寸)
  - 英寸pc：1pc 等于 12pt

- 相对单位： 

  - em：相对于该元素的一个 font-size

  - rem：相对于 html 元素的 font-size

  - vh：浏览器窗口高度的 1%

  - vw：浏览器窗口宽度的 1%

  - vmin：vh 和 vw 中的较小者

  - vmax：vh 和 vw 中的较大者



#### CSS中的颜色

- 关键字，如：red → 红色，blue → 蓝色等
- Hex，用三位16进制的数字来表示，分别代表rgb三色的值大小，从 0 到 ff，以此代表0-255，如：#4286f4
- RGB & RGBA，rgb分别代表红色、绿色、蓝色，值分别为0-255，其中a代表透明度，如：rgb(66, 134, 244), rgba(66, 134, 244,0.5), 
- HSL & HSLA，代表色相、饱和度和亮度，色相是色彩的基本属性,就是平常所说的颜色名称，如红色、黄色等，以0-360度衡量，饱和度(S)是指色彩的纯度,越高色彩越纯,低则逐渐变灰，亮度越高颜色越亮，饱和度和亮度使用0%-100%的范围，其中a代表透明度，值为0-1，如：hsl(120, 100%, 50%)