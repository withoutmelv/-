/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */



//  给你一个链表数组，每个链表都已经按升序排列。

// 请你将所有链表合并到一个升序链表中，返回合并后的链表。



// 示例 1：

// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6
// 示例 2：

// 输入：lists = []
// 输出：[]
// 示例 3：

// 输入：lists = [[]]
// 输出：[]


//暴力解法
var mergeKLists = function(lists) {
    if(lists===null){
        return null;
    }
    if(lists.length===0){
        return null;
    }
    if(lists.length===1){
        return lists[0];
    }
    const len=lists.length;
    var tmp=new ListNode(0);
    for(let i=1;i<len;i++){
        var node=tmp;
        var node0=lists[0];
        var nodex=lists[i];
        if(nodex===null){
            continue;
        }
        while(node0!==null&&nodex!==null){
            if(node0.val<=nodex.val){
                node.next=node0;
                node0=node0.next;
            }else{
                node.next=nodex;
                nodex=nodex.next;
            }
            node=node.next;
        }
        if(node0===null){
            node.next=nodex;
        }
        if(nodex===null){
            node.next=node0;
        }
        lists.splice(0,1,tmp.next);
    }
    return lists[0];
};

