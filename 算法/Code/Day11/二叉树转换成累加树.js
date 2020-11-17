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


// 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。

//  

// 例如：

// 输入: 原始二叉搜索树:
//               5
//             /   \
//            2     13

// 输出: 转换为累加树:
//              18
//             /   \
//           20     13


//。。。。。笨方法
//先遍历二叉树记录每个节点值，将累加后的值计算出来，再次遍历二叉树，更改对应值。
var convertBST = function(root) {
    var queue=[];

    var subBST=(root)=>{
        if(root==null){
            return null;
        }
        queue.push(root.val);
        if(root.left==null&&root.right==null){
            return ;
        }
        if(root.left!=null){
            subBST(root.left);
        }    
        if(root.right!=null){
            subBST(root.right);
        }
    }
    subBST(root);
    var ans=[];
    for(let i=0;i<queue.length;i++){
        ans[i]=0;
        for(let j=0;j<queue.length;j++){
            if(queue[i]<=queue[j]){
                ans[i]+=queue[j];
            }
        }
    }
    var greaterTree=(root)=>{
        if(root==null){
            return null;
        }
        root.val=ans.shift();
        if(root.left==null&&root.right==null){
            return ;
        }
        if(root.left!=null){
            greaterTree(root.left);
        }    
        if(root.right!=null){
            greaterTree(root.right);
        }
    }
    greaterTree(root);
    return root;
    

};