![image-20201117140827675](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201117140827675.png)

### 明确题意

- 链表为空的情况是否需要报错
- 链表类型是什么
- 是否需要重新分配空间

### 描述解题思路

模式识别：设计子问题->递归处理



### 代码实现

```java
struct ListWithCarry{
    ListNode *head;
    int carry;
}

ListWithCarry addListlmpl(ListNode *T1,ListNode *T2){
    ListWithCarry res;
    res.head=null;
    res.carry=0;
    if(!T1&!T2){
        return res;
    }
    int sum=0;
    
    ListWithCarry subList=addListlmpl(T1->next,T2->next);
    
    if(T1){
        sum+=T1->value;
    }
    if(T2){
        sum+=T2->value;
    }
    sum+=subList.carry;
    
    res.head=new ListNode;
    res.carry=sum/10;
    res.head->val=sum%10;
    res.head->next=subList.head;
    
    return res;
}
```



### 测试

正常测试用例

有进位的情况



### 算法复杂度

时间复杂度O(n)

空间复杂度O(n)



### 注意

两个链表长度不一样时的处理