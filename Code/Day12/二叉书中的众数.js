/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;

// }

// var root=new TreeNode(1);
// root.right=new TreeNode(2);
// root.right.left=new TreeNode(2); 
// 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

// 假定 BST 有如下定义：

// 结点左子树中所含结点的值小于等于当前结点的值
// 结点右子树中所含结点的值大于等于当前结点的值
// 左子树和右子树都是二叉搜索树
// 例如：
// 给定 BST [1,null,2,2],

//    1
//     \
//      2
//     /
//    2
// 返回[2].



//1.暴力解法，遍历整个树，将对应数字以及出现次数记录
//让后对记录的对象遍历找出出现次数最多的
var findMode = function(root) {
    if(root===null){
        return null;
    }
    var ans={};
    var max=0;
    var out=[];
    var findRepeat=(root)=>{
         if(root===null){
            return;
        }
        if(!ans[root.val]){
            ans[root.val]=1;
        }else{
            ans[root.val]++;
        }
        findRepeat(root.left);
        findRepeat(root.right);
    }
    findRepeat(root);
    console.log(ans);
    for(var key in ans){
        if(ans[key]>=max){
            max=ans[key];
        }
    }

    for(var key in ans){
        if(ans[key]===max){
            out.push(key);
        }
    }

    return out;
};
