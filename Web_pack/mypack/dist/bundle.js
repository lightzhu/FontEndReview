(function(graph){
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
      require('./entry.js')
    })({"./entry.js":{"dependencies":{"./module/a.js":"./module/a.js","./module/b.js":"./module/b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./module/a.js\");\n\nvar _a2 = _interopRequireDefault(_a);\n\nvar _b = require(\"./module/b.js\");\n\nvar _b2 = _interopRequireDefault(_b);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconsole.log(_a2.default + _b2.default);"},"./module/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = '我是模块a';"},"./module/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = '我是模块b';"}})