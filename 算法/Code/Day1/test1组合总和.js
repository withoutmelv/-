// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的数字可以无限制重复被选取。

// 说明：

// 所有数字（包括 target）都是正整数。
// 解集不能包含重复的组合。 
// 示例 1：

// 输入：candidates = [2,3,6,7], target = 7,
// 所求解集为：
// [
//   [7],
//   [2,2,3]
// ]
// 示例 2：

// 输入：candidates = [2,3,5], target = 8,
// 所求解集为：
// [
//   [2,2,2,2],
//   [2,3,3],
//   [3,5]
// ]



var combinationSum=function(candidates,target){
	const ans=[];
    function sortNumber(a, b)
{
return  a-b;
};
	candidates.sort(sortNumber);
	const dfs=(target,combine,idx)=>{
		if(idx===candidates.length){
			return ;
		}

		if(target===0){
			ans.push(combine);
			return;
		}

		if(candidates[idx]>target){
			return ;
		}

		//直接跳过当前的idx
		dfs(target,combine,idx+1);
		//选择当前数 
		if(target-candidates[idx]>=0){
			dfs(target-candidates[idx],[...combine,candidates[idx]],idx);
		}
	}

	dfs(target,[],0);
	return ans;

};