## 反转字符串中的单词III

![image-20201228105524190](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201228105524190.png)

**明确题意**：

- 字符串的形式：是否会有多余空格
- 有部分数字需不需要反转
- 标点符号的处理需求

**描述题解思路**

关键字：反转字符顺序

模式识别：字符串操作问题--->注意边界条件，利用子函数

**代码实现**

```java
//判断当前的字符是否为标点符号
bool isPunctuationOrSpace(char *character){
    return *character==''||*character==','||*character=='.';
}

//判断当前字符是否为数字
bool isNumber(char *character){
    return *character>='0'&&*character<='9';
}

//判断是否需要反转
bool needReverse(char *sentence,int *offset){
    int length=(int)strlen(sentence);
    bool needReverse=false;
    *offset=0;
    while(!isPunctuactionOrSpace(sentence+(*offset)) && (*offset)<length ){
        if(!isNumber(sentence+(*offset))){
            needReverse=true;
        }
        (*offset)++;
    }
    return needReverse;
}

//通过两个指针进行翻转操作
void reverseWord(char *word,int length){
    int i=0,j=length-1;
    while(i<j){
        swap(*(word+i),*(word+j));
        i++;
        j--;
    }
}

void reverseSentence(char *sentence){
    int length=(int)strlen(sentence);
    int offset;
    //遍历字符串，翻转单词
    for(int i=0;i<length;){
        if(needReverse(sentence+i,&offset)){
            reverseWord(sentence+i,offset);
        }
        i+=(offset+1);
    }
}


```

复杂度分析

时间复杂度：O(n)

空间复杂度: O(1)

