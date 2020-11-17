
// 接收type，pro配色等参数返回一个vnode
function createElement(type, props, ...children) {
  console.log(children)
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === "object" ? child : creatTextNode(child)
      })
    }
  }
}
function creatTextNode(text) {
  return {
    type: 'TEXT',
    props: {
      children: [],
      nodeValue: text
    }
  }
}
export default {
  createElement
}