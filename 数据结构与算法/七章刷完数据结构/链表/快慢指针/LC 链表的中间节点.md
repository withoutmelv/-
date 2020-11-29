![image-20201117084843769](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201117084843769.png)

### 明确题意

- 链表为空是否需要报错？
- 链表类型是什么？
- 节点数是奇数还是偶数？



### 描述解题思路

关键字：特定位置-中间

模式识别：设计链表的特殊位置，考虑快慢指针

- 遍历链表：快指针两倍速前进，慢指针一倍速前进
- 快指针到达尾节点时，满指针位置即为所求

### 代码实现

```java
class Solution{
    public:
    	ListNode* middleNode(ListNode* head){
            ListNode *chaser=head;
            ListNode *runner=head;
            if(head==nullptr){
                return nullptr;
            }
            
            //通过快慢指针找到特定位置
            while(runner.next!=nullptr&&runner.next.next!=nullptr){
                chaser=chaser.next;
                runner=runner.next.next;
            }
            //当链表的长度为偶数时，快指针距离尾节点差一个节点
            //当链表长度为偶数时，慢指针需要取第二个中间节点
            return (runner->next==nullptr)?chaser:chaser->next;
        }
}
```



### 测试用例

​	奇数个节点：1->2->3

​	偶数个节点：1->2->3->4

​	不进入while循环



### 算法复杂度

​	时间：O(n)

​	空间：O(1) 