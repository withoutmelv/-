![image-20201112163257095](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201112163257095.png)

### 明确题意

- 链表为空的情况是否需要报错？
- 链表的类型是什么
- 是否可以重用空间

### 描述解题思路

关键字：分隔-->链接两部分列表

模式识别：涉及头节点操作，应用哑节点

	- 优点：无需处理头节点是否为空的边界条件

### 代码实现

```java
class Solution{
    public:
    	ListNode* partition(ListNode* head,int x){
            //创建哑节点，作为头节点
            ListNode *lowListDummyHead = new ListNode(0);
            ListNode *lowListCurrent = lowListDummyHead;
            
            ListNode *highListDummyHead = new ListNode(0);
            ListNode *highListCurrent = highListDummyHead;
            
            //断开原始链表，分别加入对应分割
            while(haed!=nullptr){
                ListNode *next=head->next;
                //将旧链表中的next指向null，防止在新链表中出现环形结构
                head->next=null;
                if(head->val<x){
                    lowListCurrent->next=head;
                    lowListCurrent=lowListCurrent->next;
                }else{
                    highListCurrent->next=head;
                    highListCurrent=highListCurrent->next;
                }
                head=next;
            }
            //合并两个分链表，避免头节点NULL check
            //就像是避免cannot read property 'next' of undefined
            lowListCurrent->next=highListDummyHead->next;
            ListNode *newHead=lowListDummyHead->next;
            //释放哑节点空间
            delete lowListDummyHead;
            delete highListDummyHead;
            return newHead;
        }
}
```



### 测试

空链表情况

​	均小于：1->2->3,5

​	均大于：1->2->3,0

### 算法复杂度

时间：O(n)

空间：O(1)

