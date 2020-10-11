// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有
// 可能的并且 有效的 括号组合。

//  

// 示例：

// 输入：n = 3
// 输出：[
//        "((()))",
//        "(()())",
//        "(())()",
//        "()(())",
//        "()()()"
//      ]



/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    var ans=[];
    if(n<=0){
        return ans;
    }
    var getParenthesis=(str,left,right)=>{
        if(right===0&&left===0){
            ans.push(str);
            return ;
        }
        if(left===right){
            getParenthesis(str+"(",left-1,right);
        }else if(left<right){
            if(left>0){
                getParenthesis(str+"(",left-1,right);
            }
            getParenthesis(str+")",left,right-1);
        }
    }
    getParenthesis("",n,n);
    return ans;
};