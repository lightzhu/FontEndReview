function render(vnode, container) {
  // console.log(vnode)
  let node = createNode(vnode)
  container.appendChild(node)
}
// 根据vnode生成弄的元素 
function createNode(vnode) {
  // 处理五种种节点类型：文本，标签，函数组件，class组件，fragment，
  const { type, props } = vnode
  let node;
  if (typeof type === 'function') {
    // debugger
    node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
  } else if (type === 'TEXT') {
    node = document.createTextNode('')
  } else if (type) {
    node = document.createElement(type)
  } else {
    node = document.createDocumentFragment()
  }
  // 添加属性和值
  if (props) {
    updateNode(node, props);
  }
  // 如果有孩子节点继续生成
  if (props && props.children) {
    genChild(props.children, node)
  }
  return node
}
// 循环生成子元素
function genChild(children, node) {
  for (let child of children) {
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node)
    }
  }
}

function updateNode(node, props) {
  Object.keys(props).filter(item => item != 'children')
    .forEach(prop => {
      if (prop.slice(0, 2) === "on") {
        // 以on开头，就认为是一个事件
        let eventName = prop.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, props[prop]);
      } else {
        node[prop] = props[prop]
      }
    })
}
function updateClassComponent(vnode) {
  const { type, props } = vnode
  const _vnode = new type(props)
  return createNode(_vnode.render())
}

function updateFunctionComponent(vnode) {
  const { type, props } = vnode
  // console.log(type)
  const fncomp = type(props)
  return createNode(fncomp)
}
export default {
  render
}