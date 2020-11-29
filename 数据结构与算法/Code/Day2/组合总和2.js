/*

给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 

输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
*/

//回溯
var combinationSum2 = function(candidates, target) {
    let n = candidates.length;
    let res = [];
    let tmpPath = [];
    candidates = candidates.sort((a,b) => {return a - b})
    let backtrack = (tmpPath,target,start) => {
        if(target == 0){
            res.push(tmpPath);
            return;
        }
        for(let i = start;i < n;i++){
            if(target < candidates[i]) break;
            //相同数字只允许循环的第一个递归，避免重复
            if(i > start && candidates[i-1] == candidates[i]) continue;
            tmpPath.push(candidates[i]);
            backtrack(tmpPath.slice(),target - candidates[i],i + 1);
            tmpPath.pop();
        }
    }
    backtrack(tmpPath,target,0);
    return res;
};

//动态规划
var combinationSum2 = function (candidates, target) {
  var dp = []
  //先排序解决顺序问题 例 （1，2）（2，1）
  candidates.sort((a, b) => a - b)
  for (let i = 0; i <= target; i++) {
    dp[i] = new Set()
  }
  dp[0].add('')
  for (let c of candidates) {
    for (let i = target; i >= c; i--) {
      for (item of dp[i - c]) {
        //使用Set去重, 子项要转化成 String
        dp[i].add(item + ',' + c)
      }
    }
  }
  //最后把Set 转成 Array 
  return Array.from(dp[target]).map(item => item.slice(1).split(','))
};