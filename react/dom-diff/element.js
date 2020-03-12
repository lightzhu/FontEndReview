import utils from "./utils.js"
class Element {
  // element的属性包括标签名称,属性,子元素
  constructor(tagName, attrs, children) {
    this.tagName = tagName;
    this.attrs = attrs;
    this.children = children || [];
  }
  //渲染函数
  render() {
    let element = document.createElement(this.tagName);
    //将属性添加到元素中去
    for (let attr in this.attrs) {
      utils.setAttr(element, attr, this.attrs[attr]);
    }
    //先序深度遍历子元素
    let ziElement;
    this.children.forEach(child => {
      //如果子节点是一个元素的话，就递归创建子节点，如果是字符串的话，创建一个文件节点就可以了
      if (child instanceof Element) {
        ziElement = child.render();
      } else {
        ziElement = document.createTextNode(child);
      }
      // let childElement = (child instanceof Element) ? child.render() : document.createTextNode(child);
      element.appendChild(ziElement);
    });
    return element;
  }
}
export default function createElement(tagName, attrs, children) {
  return new Element(tagName, attrs, children);
};