# 常用运算符

## 加性运算符

- ### 加法运算

  - 如果加号两侧的操作数有其中任何一个是字符串（String）类型的，这时候+起到的是拼接字符串的作用
  - 作为加法运算，注意几点
  - Number类型
      - 如果左右两侧的操作数都是数值，那么作为正常的加法进行运算；
      - 只要其中一个操作数是NaN，那么结果就是NaN；（另外一个操作数可以是boolean,null,undefined等）
    - 如果操作数是boolean,undefined,null,则会根据对应的规则转为数字类型，然后再进行计算，如果其中转换结果为NaN,则结果就是NaN

  ```js
  Number(boolean)==NaN
  Number(true)==1
  Number(false)==0
  Number(null)==0
  Number(undefined)==NaN
  var result="1"+2+3;
  //123
  ```

- ### 减法运算

  - Number
    - 左右两侧均为数值，执行常规的减法计算；
    - 如果其中一个操作数是NaN,则返回NaN;
  - 如果操作数是字符串、布尔值、undefined、null，则先会（根据对应规则）转为数字类型，然后再进行计算，如果其中转换结果为NaN，则结果就是NaN

  <mark>**减法和加法都是加性操作符**</mark> a-b=a+(-b)



## 隐式类型转换规则

- 参考ECMAScript标准



## 乘性运算符

- ### 乘法运算

- ### 除法运算

- ### 取模运算



### 递增递减运算符

- 前置型
  - 先自增再运算
- 后置型
  - 先运算再自增

```js
var num1=num2=0
var result1=++num1 + 2;//3
var result2=num2++ + 2;//2
```



## 注意

```js
console.log(0.1+0.2);//0.30000000000000004
```

解决方案

将小数转换成整数之后，进行计算，然后再转换回来

```js
var a=0.1;
var b=0.2;
console.log((a*10+b*10)/10);//0.3
```

