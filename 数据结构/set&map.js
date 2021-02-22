let set = new Set()
set.add(1)
set.add(2)
set.add(3)
set.add(2) // 不能重复
console.log(set.has(1))
for (let [key, val] of set.entries()) {
  console.log(key, val)
}
set.delete(1)
console.log(set)

let map = new Map()
let arr = ['a', 'b', 'c', 's', 'd', 'h']
arr.forEach((val, key) => {
  map.set(key, val)
})
console.log(map)
console.log(map.has(1))
console.log(map.has('a'))