// 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据保证，新值和原始二叉搜索树中的任意节点值都不同。

// 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回任意有效的结果。

//  

// 例如, 

// 给定二叉搜索树:

//         4
//        / \
//       2   7
//      / \
//     1   3

// 和 插入的值: 5
// 你可以返回这个二叉搜索树:

//          4
//        /   \
//       2     7
//      / \   /
//     1   3 5
// 或者这个树也是有效的:

//          5
//        /   \
//       2     7
//      / \   
//     1   3
//          \
//           4

//解法一：递归
var insertIntoBST = function(root, val) {
    if(root===null){
        return new TreeNode(val);
    }
    var node=root;
    if(root.val<val){
      root.right=insertIntoBST(root.right,val);
    }else{
      root.left=insertIntoBST(root.left,val);
    }
    
    return root;

};

//
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
    if(root===null){
        return new TreeNode(val);
    }
    var node=root;
    var prev=root;
    while(node!==null){
      if(node.val<val){
        prev=node;
        node=node.right;
      }else{
        prev=node;
        node=node.left;
      }
    }
    
    if(prev.val>val){
        prev.left=new TreeNode(val);
    }else{
        prev.right=new TreeNode(val);
    }

    return root;

};