// 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

// 说明：解集不能包含重复的子集。

// 示例:

// 输入: nums = [1,2,3]
// 输出:
// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]

//迭代法
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const ans = [];
    const n = nums.length;
    for (let mask = 0; mask < (1 << n); ++mask) {
        const t = [];
        for (let i = 0; i < n; ++i) {
            if (mask & (1 << i)) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;
};


//回溯递归

// dfs(cur,n) 参数表示当前位置是cur，原序列总长度为n。原序列的每个位置在答案序列中的状态有被选中和不被选中两种，
// 我们用t数组存放已经被选出的数字。在进入 dfs(cur,n) 之前 [0,cur−1] 位置的状态是确定的，而 [cur,n−1] 内位置
// 的状态是不确定的，dfs(cur,n) 需要确定cur 位置的状态，然后求解子问题 dfs(cur+1,n)。对于 cur 位置，我们需要考
// 虑 a[cur] 取或者不取，如果取，我们需要把 a[cur] 放入一个临时的答案数组中（即上面代码中的=t），再执行 dfs(cur+1,n)，
// 执行结束后需要对 t 进行回溯；如果不取，则直接执行 dfs(cur+1,n)。在整个递归调用的过程中，cur 是从小到大递增的，当 cur 增
// 加到 n 的时候，记录答案并终止递归。可以看出二进制枚举的时间复杂度是 O(2^n)。



// 套模板！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

var subsets = function(nums) {
    const t = [];
    const ans = [];
    const n = nums.length;
    const dfs = (cur) => {
        if (cur === nums.length) {
            ans.push(t.slice());
            return;
        }
        t.push(nums[cur]);
        dfs(cur + 1, nums);
        t.pop(t.length - 1);
        dfs(cur + 1, nums);
    }
    dfs(0, nums);
    return ans;
};