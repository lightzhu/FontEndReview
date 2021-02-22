// 列队和栈数据可以用数据实现
let q = new Array()
q.push(1) // 入队
// console.log(q.shift()) // 出队


let s = new Array()
s.push(2) // 入栈
s.push(3) // 入栈
// console.log(s.pop()) // 出栈

// 数组方法
// 增加
let arr = []
arr.push(1)
arr.unshift(2)
arr.splice(0, 0, 3) // 在索引0的位置删除0个并增加3

arr = arr.concat([7, 8, 2, 9])
console.log(arr)
// 删除
arr.pop() //删除最后一个并返回
arr.shift() // 删除第一个并返回
arr.splice(0, 1) // 在索引0的位置删除1个，并返回
// console.log(arr)

// 查&改
arr.indexOf(2)
arr.lastIndexOf(2)
arr[2] = 0
console.log(arr)

// 链表可以用obj模拟
let c = { val: 'c', next: null }
let b = { val: 'b', next: c }
let a = { val: 'a', next: b }

// 遍历链表
let head = a
while (head) {
  console.log(head.val)
  head = head.next
}
// 插入链表
let d = { val: 'd', next: b }
a.next = d
let h = a
while (h) {
  console.log(h.val)
  h = h.next
}