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
 /*
 考虑对升序数组 aa 求任意两个元素之差的绝对值的最小值，答案一定为相邻两个元素之差的最小值


 
 回到本题，本题要求二叉搜索树任意两节点差的绝对值的最小值，
 而我们知道二叉搜索树有个性质为二叉搜索树中序遍历得到的值序列是递
 增有序的，因此我们只要得到中序遍历后的值序列即能用上文提及的方法来解决。

*/
var getMinimumDifference = function(root) {
    var ans=[];
    var min=Infinity;
    var dfs=(root)=>{
        if(root.left!==null) dfs(root.left);
        ans.push(root.val);
        if(root.right!==null) dfs(root.right);
    }

    dfs(root);
    console.log(ans)
    for(let j=0;j<ans.length-1;j++){
        var diff=Math.abs(ans[j]-ans[j+1]);
        if(min>diff){
            min=diff;
        }
    }
    return min;
};