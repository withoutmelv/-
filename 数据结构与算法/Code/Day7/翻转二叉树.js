/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(root==null) return null;
    if(root.left==null&&root.right==null) return root;
    var node=TreeNode(0);
    node=root.left;
    root.left=root.right;
    root.right=node;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};