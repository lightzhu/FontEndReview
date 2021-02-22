let tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};
// 深度预先遍历
function dfs(t) {
  console.log(t.val)
  if (t.left) dfs(t.left)
  if (t.right) dfs(t.right)
}
// dfs(tree)
// 广度优先遍历
function bfs(t) {
  // 定义一个队列
  let queue = [t]
  while (queue.length > 0) {
    let fn = queue.shift()
    console.log(fn.val)
    if (fn.left) queue.push(fn.left)
    if (fn.right) queue.push(fn.right)
  }
}
bfs(tree)