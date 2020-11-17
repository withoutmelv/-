
给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。

 

示例 1：

输入：
    3
   / \
  9  20
    /  \
   15   7
输出：[3, 14.5, 11]
解释：
第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。










// 方法一：深度优先搜索
// 使用深度优先搜索计算二叉树的层平均值，需要维护两个数组，counts 用于存储二叉树的每一层的节点数,sums用于存储二叉树的每
// 一层的节点值之和。搜索过程中需要记录当前节点所在层，如果访问到的节点在第i层，则将 counts[i] 的值加 1，并将该节点的值加到 sums[i]。
// 遍历结束之后，第i层的平均值即为 sums[i]/counts[i]。


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

//DFS
var binaryTreePaths = function (root) {
  let _result = [],
      map = new Map() // 记录个数
  function dfs(node, level) {
    if (!node) return
    map.set(level,(map.get(level) || 0) + 1)
    _result[level] = (_result[level] || 0) + node.val
    dfs(node.left, level+1)
    dfs(node.right, level+1)
  }
  dfs(root, 0);
  // 求平均值
  for(let i =0;i<_result.length;i++){
    _result[i] = _result[i]/map.get(i)
  }
  return _result
}


// 方法二：广度优先搜索
// 也可以使用广度优先搜索计算二叉树的层平均值。从根节点开始搜索，每一轮遍历同一层的全部节点，计算该层的节点数以及该层的节点值之和，然后计算该层的平均值。
// 如何确保每一轮遍历的是同一层的全部节点呢？我们可以借鉴层次遍历的做法，广度优先搜索使用队列存储待访问节点，只要确保在每一轮遍历时，队列中的节点是同一层的全部节点即可。具体做法如下：
// 初始时，将根节点加入队列；
// 每一轮遍历时，将队列中的节点全部取出，计算这些节点的数量以及它们的节点值之和，并计算这些节点的平均值，然后将这些节点的全部非空子节点加入队列，重复上述操作直到队列为空，遍历结束。
// 由于初始时队列中只有根节点，满足队列中的节点是同一层的全部节点，每一轮遍历时都会将队列中的当前层节点全部取出，并将下一层的全部节点加入队列，因此可以确保每一轮遍历的是同一层的全部节点。
// 具体实现方面，可以在每一轮遍历之前获得队列中的节点数量size，遍历时只遍历 size 个节点，即可满足每一轮遍历的是同一层的全部节点。

//BFS
var averageOfLevels = function(root) {
  let _result = [],
      queue = [];
  if (root == null) return [];
  queue.push(root);

  while (queue.length) {
    let len = queue.length,
        levelSum = 0;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      levelSum = levelSum+node.val;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    _result.push(levelSum/len);
  }
  return _result;
};
