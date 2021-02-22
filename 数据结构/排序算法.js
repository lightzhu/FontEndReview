// 冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let tem = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tem
      }
    }
  }
  return arr
}
// test
// console.log(bubbleSort([1, 3, 4, 6, 2, 0]))

//选择排序
function selectSort(arr) {
  let empty = []
  while (arr.length) {
    let index = 0 //假设当前数组最小值index是0
    for (let i = 1; i < arr.length; i++) {
      // 遍历数组找到其中的最小值下标
      if (arr[i] < arr[index]) {
        index = i
      }
    }
    // 将找到的最小值和数组的首元素交换
    let tem = arr[0]
    arr[0] = arr[index]
    arr[index] = tem
    empty.push(arr.shift())
  }
  return empty
}
// console.log(selectSort([1, 3, 4, 6, 2, 0]))

// 插入排序
function insertSort(arr) {
  let tem = null
  for (let i = 1; i < arr.length; i++) {
    tem = arr[i]
    let j = i
    while (j > 0) {
      if (arr[j - 1] > tem) {
        arr[j] = arr[j - 1]
      } else {
        break
      }
      j--
    } 
    arr[j] = tem
  }
  return arr
}
console.log(insertSort([1, 3, 4, 6, 2, 8, 0]))
// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) { // 数组元素被划分到剩1个时，递归终止
    return arr
  }
  let pivot = arr.length / 2 | 0
  let pivotVal = arr[pivot]
  arr.splice(pivot, 1)
  let leftArr = []
  let rightArr = []
  arr.forEach(val => {
    // console.log(leftArr)
    val > pivotVal ? rightArr.push(val) : leftArr.push(val)
  })
  // console.log(pivot)
  return [...quickSort(leftArr), pivotVal, ...quickSort(rightArr)]
}
// test
// console.log(quickSort([1, 3, 7, 5, 0]))

// 归并排序
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  let midIndex = arr.length / 2 | 0
  let leftArr = arr.slice(0, midIndex)
  let rightArr = arr.slice(midIndex)
  return merge(mergeSort(leftArr), mergeSort(rightArr))
  function merge(arr1, arr2) {
    let result = []
    while (arr1.length && arr2.length) {
      arr1[0] <= arr2[0] ? result.push(arr1.shift()) : result.push(arr2.shift())
    }
    while (arr1.length) {
      result.push(arr1.shift())
    }
    while (arr2.length) {
      result.push(arr2.shift())
    }
    return result
  }
}
// test
// console.log(mergeSort([1, 3, 7, 5, 0]))

/*堆排序:
* 初始化大(小)根堆，此时根节点为最大(小)值，将根节点与最后一个节点(数组最后一个元素)交换
* 除开最后一个节点，重新调整大(小)根堆，使根节点为最大(小)值
* 重复步骤二，直到堆中元素剩一个，排序完成 
*/
// 堆排序
const heapSort = array => {
  // 我们用数组来储存这个大根堆,数组就是堆本身
  // 初始化大顶堆，从第一个非叶子结点开始
  for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
    heapify(array, i, array.length);
  }
  // 排序，每一次 for 循环找出一个当前最大值，数组长度减一
  for (let i = Math.floor(array.length - 1); i > 0; i--) {
    // 根节点与最后一个节点交换
    swap(array, 0, i);
    // 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，所以第三个参数为 i，即比较到最后一个结点前一个即可
    heapify(array, 0, i);
  }
  return array;
};

// 交换两个节点
const swap = (array, i, j) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const heapify = (array, i, length) => {
  let temp = array[i]; // 当前父节点
  // j < length 的目的是对结点 i 以下的结点全部做顺序调整
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = array[i]; // 将 array[i] 取出，整个过程相当于找到 array[i] 应处于的位置
    if (j + 1 < length && array[j] < array[j + 1]) {
      j++; // 找到两个孩子中较大的一个，再与父节点比较
    }
    if (temp < array[j]) {
      swap(array, i, j); // 如果父节点小于子节点:交换；否则跳出
      i = j; // 交换后，temp 的下标变为 j
    } else {
      break;
    }
  }
}

// 数组扁平化
function _flat(arr) {
  let newArr = []
  deepFlat(arr)
  function deepFlat(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Array) {
        deepFlat(arr[i])
      } else {
        if (newArr.indexOf(arr[i]) == -1) {
          newArr.push(arr[i])
        }
      }
    }
  }
  return newArr.sort((a, b) => {
    return a - b
  })
}
var arr0 = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
console.log(_flat(arr0))
// 实现打印 0-9，三种方式
// for (var i = 0; i < 10; i++) {
//   (function (j) {
//     setTimeout(() => {
//       console.log(j);
//     }, 1000)
//   })(i)
// }
// for (let i = 0; i < 10; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000)
// }
for (var i = 0; i < 10; i++) {
  setTimeout((i) => {
    console.log(i);
  }, 1000, i)
}