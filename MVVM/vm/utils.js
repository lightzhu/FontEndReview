/* 是否是元素节点*/
(function util() {
  function isElementNode(node) {
    return node.nodeType === 1
  }
  //是不是指令
  function isDirective(name) {
    return name.startsWith("v-");
  }
  let utils = {
    isElementNode: isElementNode,
    isDirective: isDirective
  }
  window.utils = utils
})(window)
