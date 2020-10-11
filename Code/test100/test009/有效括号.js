// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

// 示例 1:

// 输入: "()"
// 输出: true
// 示例 2:

// 输入: "()[]{}"
// 输出: true
// 示例 3:

// 输入: "(]"
// 输出: false
// 示例 4:

// 输入: "([)]"
// 输出: false
// 示例 5:

// 输入: "{[]}"
// 输出: true

// 不能忘了扫描过的左括号，它们等着被匹配，需要一个容器暂存。
// 那么，这个容器为什么是栈？
// 我们继续往右扫，当遇到右括号，我们期待它匹配掉「最近出现的左括号」。
// 容器中的「最近出现的左括号」被匹配了，不用等待匹配了，可以离开容器。
// 它是「后进」的，现在「先出」了，所以是栈。
// 像对对碰，匹配了就拿掉，直到容器中所有左括号都匹配光，则有效。如果还剩下左括号未匹配，则不有效。

// 复杂度分析
// 时间复杂度：O(n)O(n)。 遍历每个字符——O(n)O(n)，字符的入栈或出栈——O(1)O(1)操作。
// 空间复杂度：O(n)O(n)。

const isValid = (s) => {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c == '{' || c == '[' || c == '(') {
      stack.push(c);
    } else {
      if (stack.length == 0) {
        return false;
      }
      const top = stack[stack.length - 1];
      if (top == '(' && c == ')' || top == '[' && c == ']' || top == '{' && c == '}') {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  if (stack.length) {
    return false;
  }
  return true;
};


//重构
const isValid = (s) => {
  const matchMap = {
    '{': '}',
    '[': ']',
    '(': ')'
  };
  const stack = [];
  for (const c of s) {
    if (matchMap[c]) {
      stack.push(c);
    } else {
      if (stack.length == 0) {
        return false;
      }
      const top = stack[stack.length - 1];
      if (matchMap[top] == c) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length == 0;
};
