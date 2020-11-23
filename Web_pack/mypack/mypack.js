const babelParser = require('@babel/parser').parse
const traverse = require("@babel/traverse").default
const { transformFromAst } = require("babel-core")
const path = require('path')
const fs = require('fs')
class MyPack {
  constructor(options) {
    const { entry, output } = options
    // console.log(entry)
    this.entry = entry
    this.output = output
    this.modules = []
  }
  run() {
    const info = this.parse(this.entry)
    // console.log(info)
    // 将解析的模块放到缓存中
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      let module = this.modules[i]
      // 处理模块自己的依赖
      let _dependencies = module.dependencies
      if (_dependencies) {
        for (let j in _dependencies) {
          // 动态改变整个项目依赖，达到递归处理的目的
          this.modules.push(this.parse(_dependencies[j]))
        }
      }
    }
    // console.log(this.modules)
    let modulesMap = {}
    this.modules.forEach(item => {
      modulesMap[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    // console.log(modulesMap)
    this.transformCode(modulesMap)
  }
  parse(entryFile) {
    // 根据入口文件地址读取入口内容
    const content = fs.readFileSync(path.join(__dirname, entryFile), 'utf8')
    // 将内容转换成ast抽象语法树
    let ast = babelParser(content, { sourceType: 'module' })
    // console.log(ast)
    let dependencies = {}
    traverse(ast, {
      ImportDeclaration({ node }) {
        // 处理依赖模块的路径
        const newPathName = './' + path.join(path.dirname(entryFile), node.source.value);
        console.log(node.source);
        // console.log(node)
        dependencies[node.source.value] = newPathName;
      }
    })
    // 将ast装换成字符串
    const { code } = transformFromAst(ast, null, {
      presets: ["babel-preset-env"],
    })
    // console.log(code)
    return {
      entryFile,
      dependencies,
      code,
    }
  }
  transformCode(moduleMap) { // 将代码转换成浏览器可识别的形式
    const outPath = path.join(this.output.path, this.output.filename)
    let codemap = JSON.stringify(moduleMap)
    //组装可运行的函数
    let codeStr = `(function(graph){
      // 定义全局的require,exports，挂载在windows上面

      function require(module){
        function _require(_path){
          return require(graph[module].dependencies[_path])
        }
        var exports ={};
        (function(require,exports,code){
          // 内部继续递归处理require
          eval(code)
        })(_require,exports,graph[module].code)
        return exports;
      }
      require('${this.entry}')
    })(${codemap})`;
    // 写到目标文件中ß
    fs.writeFileSync(outPath, codeStr, 'utf8')
  }
}
module.exports = MyPack