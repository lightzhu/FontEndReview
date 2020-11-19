const UPDATE = 'UPDATE'
const PLACEMENT = 'PLACEMENT'
// 定义下一个单元任务
let nextWorker = null
// 工作中的根节点
let progressRoot = null
// 当前的根节点
let currentRoot = null


function render(vnode, container) {
  // 初始化progressRoot
  progressRoot = {
    node: container,
    props: { children: [vnode] },
    base: currentRoot
  }
  // 开始第一个任务
  nextWorker = progressRoot
}
// 根据vnode生成弄的元素 
function createNode(vnode) {
  // 处理五种种节点类型：文本，标签，函数组件，class组件，fragment，
  const { type, props } = vnode
  let node;
  if (type === 'TEXT') {
    node = document.createTextNode('')
  } else if (type) {
    node = document.createElement(type);
  }
  // else {
  //   node = document.createDocumentFragment()
  // }
  // 添加属性和值
  if (props) {
    updateNode(node, props);
  }
  return node
}
// 循环生成子元素
function genChild(fuFiber, children) {
  let nextFiber = null;
  let oldFiber = fuFiber.base && fuFiber.base.child
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    let newfiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      parent: fuFiber
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (i === 0) {
      fuFiber.child = newfiber
    } else {
      nextFiber.sibling = newfiber
    }
    nextFiber = newfiber
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
  const children = [_vnode.render()]
  genChild(vnode, children)
}

function updateFunctionComponent(vnode) {
  const { type, props } = vnode
  // console.log(type)
  const fncomp = [type(props)]
  console.log(fncomp)
  // debugger
  genChild(vnode, fncomp)
}
function updateHostComponent(vnode) {
  if (!vnode.node) {
    vnode.node = createNode(vnode)
  }
  const { children } = vnode.props
  genChild(vnode, children)
}
function updateFragmentComponent(vnode) {
  const { children } = vnode.props
  genChild(vnode, children)
}

function runWorker(fiber) {
  // console.log(fiber)
  // 执行当前任务，返回下一个子任务
  const { type } = fiber
  console.log(type)
  if (typeof type === 'function') {
    type.isReactComponent ? updateClassComponent(fiber) : updateFunctionComponent(fiber)
  } else if (type) {
    updateHostComponent(fiber)
  } else {
    updateFragmentComponent(fiber)
  }
  // updateHostComponent(fiber)
  // 如果有子节点返回子节点
  if (fiber.child) {
    return fiber.child
  }
  // 没有子节点找兄弟节点
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function commitWorker(fiber) {
  if (!fiber) {
    return
  }
  // let fiber = progressRoot.child
  let parentNodeFiber = fiber.parent
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.parent
  }
  let parentNode = parentNodeFiber.node
  console.log(fiber)
  if (fiber.node) {
    parentNode.appendChild(fiber.node)
  }
  commitWorker(fiber.child)
  commitWorker(fiber.sibling)
}
function commitAll() {
  commitWorker(progressRoot.child)
  currentRoot = progressRoot
  progressRoot = null
}

function workLoop(deadLine) {
  // debugger
  // console.log(deadLine.timeRemaining())
  // 第一步，执行子任务
  // 第二步，返回下一个子任务
  while (nextWorker && deadLine.timeRemaining() > 1) { // 有下一个子任务，并且当前有可执行时间
    console.log(runWorker(nextWorker))
    nextWorker = runWorker(nextWorker) // 重新赋值，保证一直循环
  }
  // ... 第三步，执行完成，提交
  if (!nextWorker && progressRoot) {
    commitAll()
  }
  requestIdleCallback(workLoop);
}
window.requestIdleCallback(workLoop)

export default {
  render
}