import utils from "./utils.js";
let keyIndex = 0;
function diff(oldTree, newTree) {
  //记录差异的对象
  let patches = {};
  keyIndex = 0;
  let index = 0;
  compare(oldTree, newTree, index, patches);
  return patches;
}
function compare(oldTree, newTree, index, patches) {
  let currentPatches = [];
  if (!oldTree) {
    currentPatches.push({ type: utils.REPLACE, node: newTree });
    patches[index] = currentPatches;
    return false;
  }
  if (!newTree) {//节点被删除
    currentPatches.push({ type: utils.REMOVE, index });
  } else if (utils.isString(oldTree) && utils.isString(newTree)) {//如果说新老的节点都是文本
    if (oldTree != newTree) {
      currentPatches.push({ type: utils.TEXT, content: newTree });
    }
  } else if (oldTree.tagName == newTree.tagName) {//新老节点标签未改变
    //比较新旧元素的属性对象
    let attrsPatch = diffAttr(oldTree.attrs, newTree.attrs);
    //如果新旧元素有差异 的属性的话
    if (Object.keys(attrsPatch).length > 0) {
      //添加到差异数组中去
      currentPatches.push({ type: utils.ATTRS, attrs: attrsPatch });
    }
    // 子元素数量不同直接替换
    if (oldTree.children.length != newTree.children.length) {
      currentPatches.push({ type: utils.REPLACE, node: newTree });
    } else {
      //自己比完后再比自己的儿子们
      diffChildren(oldTree.children, newTree.children, index, patches);
    }
  } else {
    currentPatches.push({ type: utils.REPLACE, node: newTree });
  }
  if (currentPatches.length > 0) {
    patches[index] = currentPatches;
  }
}
// 属性比较
function diffAttr(oldAttrs, newAttrs) {
  let attrsPatch = {};
  for (let attr in oldAttrs) {
    // 找出新老节点的不同
    if (oldAttrs[attr] != newAttrs[attr]) {
      attrsPatch[attr] = newAttrs[attr];
    }
  }
  for (let attr in newAttrs) {
    // 新节点新增了属性
    if (!oldAttrs.hasOwnProperty(attr)) {
      attrsPatch[attr] = newAttrs[attr];
    }
  }
  return attrsPatch;
}
function diffChildren(oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, idx) => {
    // debugger
    compare(child, newChildren[idx], ++keyIndex, patches);
  });
  if (newChildren.length > oldChildren.length) {
    for (let i = oldChildren.length - 1; i < newChildren.length; i++) {
      compare(null, newChildren[i], ++keyIndex, patches);
    }
  }
}
module.exports = diff;