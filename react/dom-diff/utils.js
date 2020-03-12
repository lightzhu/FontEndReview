const REMOVE = 'REMOVE';//此节点被移除
const ATTRS = "ATTRS";//属性被改变
const TEXT = "TEXT";//文本内容被改变
const REPLACE = "REPLACE"; //节点要被整个替换  
function setAttr(element, attr, value) {
  switch (attr) {
    case 'style':
      element.style.cssText = value;
      break;
    case 'value':
      let tagName = element.tagName.toLowerCase();
      if (tagName == 'input' || tagName == 'textarea') {
        element.value = value;
      } else {
        element.setAttribute(attr, value);
      }
      break;
    default:
      element.setAttribute(attr, value);
      break;
  }
};
function typeis(obj) {
  // [object String]
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
};
function isString(str) {
  return typeis(str) == 'String';
}
module.exports = {
  REMOVE,
  ATTRS,
  TEXT,
  REPLACE,
  setAttr,
  typeis,
  isString
};