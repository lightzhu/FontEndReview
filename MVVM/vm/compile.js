const { isElementNode, isDirective } = utils
class Compile {
  constructor(el, vm) {
    this.el = isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      // 1.在内存中创建文档片段
      let fragment = this.node2fragment(this.el);

      // 2.编译，处理指令及绑定的数据
      this.compile(fragment)
      // 3.将生成的文档append到页面中
      this.el.appendChild(fragment)

    }
  }
  //将dom 节点转换成内存中的碎片
  node2fragment(el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment;
  }
  // 编译
  compile(fragment) {
    //需要递归
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if (isElementNode(node)) {
        //是元素节点 还需要继续深入的检查
        this.compileElement(node);
        this.compile(node);
      } else {
        //文本节点,编译文本
        // console.log("text",node)
        this.compileText(node);
      }
    })
  }

  // 编译模版元素
  compileElement(element) {
    //带v-model  v-text
    let attrs = element.attributes; //取出当前节点的属性
    // console.log(attrs);
    Array.from(attrs).forEach(attr => {
      //attr.name 获取自定义属性的key value是值
      if (isDirective(attr.name)) {
        //取到对应的值放到节点中
        let expr = attr.value;
        // let type = attr.name.slice(2)
        let [, type] = attr.name.split("-");//解构赋值
        CompileUtil[type](element, this.vm, expr);
      }
    })
  }
  // 处理是文本的节点
  compileText(textNode) {
    let expr = textNode.textContent; //取文本中的内容
    console.log(expr)
    let reg = /\{\{([^}]+)\}\}/g; //{{a}} {{b}}
    if (reg.test(expr)) {
      CompileUtil['text'](textNode, this.vm, expr);
    }
  }
}
CompileUtil = {
  getVal(vm, expr) { //获取实例上对应的数据
    expr = expr.split("."); //[a,v,c,s,a,w,r]
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data)
  },
  getTextVal(vm, expr) { //获取文本编译后的结果
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1]);
    })
  },
  setVal(vm, expr, value) {
    expr = expr.split(".")
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex == expr.length - 1) {
        return prev[next] = value;
      }
      return prev[next]
    }, vm.$data)
  },
  text(node, vm, expr) { //文本处理
    let updateFn = this.updater['textUpdater'];
    let value = this.getTextVal(vm, expr)
    // console.log(value)
    expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1], (newValue) => {
        //如果数据变化了  文本节点需要重新获取依赖的数据跟新文本中的内容
        updateFn && updateFn(node, this.getTextVal(vm, expr));
      })
    })
    // //vm.$data[expr]; //message.a
    updateFn && updateFn(node, value);
  },
  model(node, vm, expr) { //输入框处理
    let updateFn = this.updater['modelUpdater'];
    //这里应该加一个监控 数据变化了 应该调用这个watch的callback
    new Watcher(vm, expr, (newValue) => {
      //当值变化后 会调用cb 将新的值传递过来()
      updateFn && updateFn(node, this.getVal(vm, expr));
    })
    node.addEventListener("input", (e) => {
      let value = e.target.value;
      this.setVal(vm, expr, value)
    })
    updateFn && updateFn(node, this.getVal(vm, expr));
  },
  updater: {
    //文本更新
    textUpdater(node, value) {
      node.textContent = value;
    },
    //输入框更新
    modelUpdater(node, value) {
      node.value = value;
    }
  }
}
// export default Compile;