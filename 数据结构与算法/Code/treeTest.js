function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var root=new TreeNode(3);
root.left=new TreeNode(9);
root.right=new TreeNode(20);
root.right.left=new TreeNode(15);
root.right.right=new TreeNode(7);


  //   3
  //  / \
  // 9  20
  //   /  \
  //  15   7