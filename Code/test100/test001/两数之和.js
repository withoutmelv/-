// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

//1.暴力解法

var twoSum = function(nums, target) {

    var ans=[];

    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]+nums[j]===target){
                ans.push(i);
                ans.push(j);
                return ans;
            }
        }
    }
};

//2.哈希表

const twoSum = (nums, target) => {
  // 存放出现过的数字，和对应的索引
  const prevNums = {};                         
  // 遍历元素
  for (let i = 0; i < nums.length; i++) {      
    // 当前元素
    const curNum = nums[i];                    
    // 满足题目要求的目标元素
    const targetNum = target - curNum;         
    // 在prevNums中找目标元素的索引
    const targetNumIndex = prevNums[targetNum];
    // 如果存在，直接返回 [目标元素的索引, 当前索引]
    if (targetNumIndex !== undefined) {        
      return [targetNumIndex, i];             
    }                                     
    // 如果不存在，说明之前没出现过目标元素
    // 每次都存入当前元素和对应的索引
    prevNums[curNum] = i;                      
  }
}


