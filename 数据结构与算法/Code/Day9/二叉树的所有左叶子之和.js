// 计算给定二叉树的所有左叶子之和。

// 示例：

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    if(root==null) return 0;
    if(root.left==null&&root.right==null) return 0;
    var sum=0;
    var countSumOfLeft=(root)=>{
        if (root==null) return ;
        var node=root.left;
        
        if(node==null) return countSumOfLeft(root.right) ;
        console.log(node);
        if(node.left==null&&node.right==null){
            sum+=node.val;
        }else{
            countSumOfLeft(node);
        }
        countSumOfLeft(root.right);

    }
    countSumOfLeft(root);
    return sum;
    
};