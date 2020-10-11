function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var root=new TreeNode(3);
var root.left=new TreeNode(9);
var root.right=new TreeNode(20);
var root.right.left=new TreeNode(15);
var root.right.right=new TreeNode(7);


  //   3
  //  / \
  // 9  20
  //   /  \
  //  15   7