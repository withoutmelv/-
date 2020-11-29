

![image-20201117094936217](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201117094936217.png)

### 明确题意

- 链表为空是否需要报错
- 链表类型是什么
- 节点数是奇数还是偶数

### 描述题解思路

关键字：交换

模式识别：交换链表顺序，先前驱，再处理

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201117100350369.png" alt="image-20201117100350369" style="zoom: 67%;" />

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201117100409880.png" alt="image-20201117100409880" style="zoom:67%;" />

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201117100419657.png" alt="image-20201117100419657" style="zoom:67%;" />



### 代码实现

```java
class Solution{
    public:
    	ListNode* swapPairs(ListNode* head){
            if(head==nullptr){
                return nullptr;
            }
            
            //创建哑节点
            ListNode *dummy=new ListNode(0);
            dummy->next=head;
            
            ListNode *prev=dummy;
            ListNode *node1;
            ListNode *node2;
            
            while(prev->next!=nullptr&&prev->next->next!=nullptr){
                node1=prev->next;
                node2=prev->next->next;
                
                //处理前驱
                prev->next=node2;
                node1->next=node2->next;
                node2->next=node1;
                
                //状态顺移
                prev=node1;
            }
            ListNode *newHead=dummy->next;
            delete dummy;
            return ListNode;
        }
}
```

### 测试

​	奇数个节点：1->2->3

​	偶数个节点：1->2->3->4

​	不进入while循环



### 算法复杂度

​	时间复杂度：O(n)

​	空间复杂度：O(1)