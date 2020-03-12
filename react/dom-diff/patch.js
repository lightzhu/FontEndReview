import utils from "./utils.js";
let allPatches;
let index = 0;// 默认从0开始
function patch(vnode, patches) {
  allPatches = patches;
  walk(vnode);
}
function walk(node) {
  let currentPatches = allPatches[index];
  index++;
  let childNodes = node.childNodes || [];
  childNodes.forEach(child => walk(child));
  if (currentPatches) {
    doPatch(node, currentPatches);
  }
}
function doPatch(node, currentPatches) {
  currentPatches.forEach(patch => {
    console.log(patch.type);
    switch (patch.type) {
      case utils.ATTRS:
        for (let attr in patch.attrs) {
          let value = patch.attrs[attr];
          if (value) {
            utils.setAttr(node, attr, value);
          } else {
            node.removeAttribute(attr);
          }
        }
        break;
      case utils.TEXT:
        node.textContent = patch.content;
        break;
      case utils.REPLACE:
        let newNode = (typeof (patch.node) == 'object') ? patch.node.render() : document.createTextNode(patch.node);
        node.parentNode.replaceChild(newNode, node);
        break;
      case utils.REMOVE:
        node.parentNode.removeChild(node);
        break;
    }
  })
}
module.exports = patch;