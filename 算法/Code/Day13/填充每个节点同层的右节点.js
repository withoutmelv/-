// 给定一个二叉树

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

// 初始状态下，所有 next 指针都被设置为 NULL。

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    var queue=[];
    
    if(root===null){
        return null;
    }
    queue.push(root);
    while(queue.length!==0){
        console.log(queue);
        if(queue.length>=2){
            for(let k=0;k<queue.length-1;k++){
                queue[k].next=queue[k+1];
            }
        }
        var len=queue.length;
        for(let i=0;i<len;i++){
            var node=queue.shift();
            if(node.left!=null) queue.push(node.left);
            if(node.right!=null) queue.push(node.right);
        }
        
    }
    return root;
};