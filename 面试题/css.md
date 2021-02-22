# Css 题目汇总

## css 伪类与伪元素区别

1）伪类(pseudo-classes)

- 其核⼼就是⽤来选择 DOM 树之外的信息,不能够被普通选择器选择的⽂档之外的元素，⽤来添加⼀些选择器的特殊效果。
- ⽐如:hover :active :visited :link :visited :first-child :focus :lang 等
- 由于状态的变化是⾮静态的，所以元素达到⼀个特定状态时，它可能得到⼀个伪类的样式；当状态改变时，它⼜会失去这个样式。
- 由此可以看出，它的功能和 class 有些类似，但它是基于⽂档之外的抽象，所以叫 伪类。
  2）伪元素(Pseudo-elements)
- DOM 树没有定义的虚拟元素
- 核⼼就是需要创建通常不存在于⽂档中的元素，
- ⽐如::before ::after 它选择的是元素指定内容，表示选择元素内容的之前内容或之后内容。
- 伪元素控制的内容和元素是没有差别的，但是它本身只是基于元素的抽象，并不存在于⽂档中，所以称为伪元素。⽤于将特殊的效果添加到某些选择器
  3）伪类与伪元素的区别
- 表示⽅法
  - CSS2 中伪类、伪元素都是以单冒号:表示,
  - CSS2.1 后规定伪类⽤单冒号表示,伪元素⽤双冒号::表示，
  - 浏览器同样接受 CSS2 时代已经存在的伪元素(:before, :after, :first\ufffeline, :first-letter 等)的单冒号写法。
  - CSS2 之后所有新增的伪元素(如::selection)，应该采⽤双冒号的写法。
  - CSS3 中，伪类与伪元素在语法上也有所区别，伪元素修改为以::开头。浏览器对以:开头的伪元素也继续⽀持，但建议规范书写为::开头
- 定义不同
  - 伪类即假的类，可以添加类来达到效果
  - 伪元素即假元素，需要通过添加元素才能达到效果
- 总结:
  - 伪类和伪元素都是⽤来表示⽂档树以外的"元素"。
  - 伪类和伪元素分别⽤单冒号:和双冒号::来表示。
  - 伪类和伪元素的区别，关键点在于如果没有伪元素(或伪类)，
  - 是否需要添加元素才能达到效果，如果是则是伪元素，反之则是伪类。
    4）相同之处：
- 伪类和伪元素都不出现在源⽂件和 DOM 树中。也就是说在 html 源⽂件中是看不到伪类和伪元素的。
  不同之处：
- 伪类其实就是基于普通 DOM 元素⽽产⽣的不同状态，他是 DOM 元素的某⼀特征。
- 伪元素能够创建在 DOM 树中不存在的抽象对象，⽽且这些抽象对象是能够访问到的。

## 说一下盒子模型，以及标准情况和 IE 下的区别

- w3c 的盒模型的构成：content border padding margin
- IE 盒模型,宽度 width=content+padding
- IE 模型和标准模型唯一的区别是内容计算方式的不同

## Css 如何画出一个扇形，动手实现下

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>使用css3绘制任意角度扇形</title>
  <style>
  .pie {
    position: relative;
    margin: 1em auto;
    padding: 0;
    width: 32em;
    height: 32em;
    border-radius: 100%;
    list-style: none;
    overflow: hidden;
    transform: rotate(0deg) /*针对mac safari浏览器兼容*/

  }
  .slice {   /*一个slice最多设置成一个90度的扇形，超过就需要多个slice进行拼接*/
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    transform-origin: 0% 100%;/*设置旋转的基准点*/
  }
  .slice-1 {
    transform: rotate(-36deg) skewY(-54deg);/*通过配置rotate和skewY的值来设置扇形的角度和位置*/
    background: #FF0088;
 }
  .slice-2 {
    transform: rotate(-72deg) skewY(-54deg);
    background: #FF0000;
 }
  </style>
</head>
<body>
   <ul class='pie'>
      <li class='slice-1 slice'> </li>
      <li class='slice-2 slice'> </li>
  <ul>
</body>
</html>
```

## iPhone 里面 Safari 上如果一个输入框 fixed 绝对定位在底部，当软键盘弹出的时候会有什么问题，如何解决

软键盘唤起后，页面的 fixed 元素将失效（即无法浮动，也可以理解为变成了 absolute 定位），所以当页面超过一屏且滚动时，失效的 fixed 元素就会跟随滚动了。这便是 iOS 上 fixed 元素和输入框的 bug 。其中不仅限于 type=text 的输入框，凡是软键盘（比如时间日期选择、select 选择等等）被唤起，都会遇到同样地问题。
解决：使 fixed 元素的父级不出现滚动，而将原 body 滚动的区域域移到 main 内部，而 header 和 footer 的样式不变

## BFC 是什么？触发 BFC 的条件是什么？有哪些应用场景？

1. 根元素(<html>)
2. 浮动元素（元素的 float 不是 none）
3. 绝对定位元素（元素的 position 为 absolute 或 fixed）
4. 行内块元素（元素的 display 为 inline-block）
5. 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
6. 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
7. 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
8. overflow 值不为 visible 的块元素
9. display 值为 flow-root 的元素
10. contain 值为 layout、content 或 paint 的元素
11. 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
12. 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
13. 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
14. column-span 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

### 3.应用场景

1）清除内部的浮动，触发父元素的 BFC 属性，会包含 float 元素；
防止浮动导致父元素高度塌陷父级设置 overflow：hidden,元素 float:right;
2）分属于不同的 BFC，可以阻止 Margin 重叠；
避免 margin 重叠,两个块相邻就会导致外边距被折叠，给中间的设置 BFC 就会避免，方法就是套个父级设置 overflow：hidden
3）阻止元素被浮动元素覆盖，各自是独立的渲染区域；
4）自适应两栏布局；

## 说一下什么是重绘重排，哪些操作会造成重绘重排

重绘:当元素的一部分属性发生改变，如外观、背景、颜色等不会引起布局变化，只需要浏览器根据元素的新属性重新绘制 ，使元素呈现新的外观叫做重绘
重排（回流）:当 render 树中的一部分或者全部因为大小边距等问题发生改变而需要 DOM 树重新计算的过程 重绘不一定需要重排（比如颜色的改变），重排必然导致重绘（比如改变网页位置）

## 什么情况会出现浏览器分层

通常页面的组成是非常复杂的，有的页面里要实现一些复杂的动画效果，比如点击菜单时弹出菜单的动画特效，滚动鼠标滚轮时页面滚动的动画效果，当然还有一些炫酷的 3D 动画特效。如果没有采用分层机制，从布局树直接生成目标图片的话，那么每次页面有很小的变化时，都会触发重排或者重绘机制，这种“牵一发而动全身”的绘制策略会严重影响页面的渲染效率。

为了提升每帧的渲染效率，Chrome 引入了分层和合成的机制。

你可以把一张网页想象成是由很多个图片叠加在一起的，每个图片就对应一个图层，Chrome 合成器最终将这些图层合成了用于显示页面的图片。如果你熟悉 PhotoShop 的话，就能很好地理解这个过程了，PhotoShop 中一个项目是由很多图层构成的，每个图层都可以是一张单独图片，可以设置透明度、边框阴影，可以旋转或者设置图层的上下位置，将这些图层叠加在一起后，就能呈现出最终的图片了。

在这个过程中，将素材分解为多个图层的操作就称为分层，最后将这些图层合并到一起的操作就称为合成。所以，分层和合成通常是一起使用的。

考虑到一个页面被划分为两个层，当进行到下一帧的渲染时，上面的一帧可能需要实现某些变换，如平移、旋转、缩放、阴影或者 Alpha 渐变，这时候合成器只需要将两个层进行相应的变化操作就可以了，显卡处理这些操作驾轻就熟，所以这个合成过程时间非常短。

#### 生成层的方式

在某些特定条件下，浏览器会主动将渲染层提至合成层，那么影响 composite 的因素有哪些？

- 3D transforms: translate3d, translateZ 等;
- video, canvas, iframe 等元素;
- 通过 Element.animate() 实现的 opacity 动画转换;
- 通过 СSS 动画实现的 opacity 动画转换;
- position: fixed;
- will-change;
- filter;
- 有合成层后代同时本身 overflow 不为 visible（如果本身是因为明确的定位因素产生的 SelfPaintingLayer，则需要 z-index 不为 auto）

## 通过 link 进来的 css 会阻塞页面渲染嘛，Js 会阻塞吗，如果会如何解决？

`<link>`标签并不会像带 scr 属性的`<script>`标签一样会触发页面 paint。浏览器并行解析生成 DOM` Tree 和 CSSOM Tree，当两者都解析完毕，才会生成 rending tree，页面才会渲染。所以应尽量减小引入样式文件的大小，提高首屏展示速度。

`<script>`标签会阻塞 DOM 解析和渲染，但在阻塞同时，其他线程会解析文档的其余部分（预解析），找出并加载需要通过网络加载的其他资源。通过这种方式，资源可以在并行连接上加载，从而提高总体速度。预解析不会修改解析出来的 DOM 树，只会解析外部资源（例如外部脚本、样式表和图片）的引用。
优化：

- 合理放置脚本位置、 预加载 Link preload、DNS Prefetch 预解析、script 延迟脚本加载 defer/async

## 使用 Css 实现一个水波纹效果

```
.waves-ripple {
    position: absolute;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    background-clip: padding-box;
    pointer-events: none;
    user-select: none;
    transform: scale(0);
    opacity: 1;
}
.waves-ripple.z-active {
    opacity: 0
    transform: scale(2);
    transition: opacity 1.2s ease-out, transform 0.6s ease-out;
}
```

## position 定位都有什么属性（不仅仅是绝对定位和相对定位/fix 定位）

- `position: relative，absolute，fixed，static`

## `nth-child`和`nth-of-type` 有什么区别

## `<img>`是什么元素

## flex 布局，如何实现把八个元素分两行摆放

## Css 方式实现一个不知道宽高的 div 居中都有哪几种方法

## 简述 Grid 布局

Grid 将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。网格是一组相交的水平线和垂直线，它定义了网格的列和行。我们可以将网格元素放置在与这些行和列相关的位置上。

## 动手实现一个左右固定 100px，中间自适应的三列布局？(至少三种)

- float 、position 、flex 、

## 屏幕占满和未占满的情况下，使 footer 固定在底部，尽量多种方法

- position 定位、flex、calc 计算

## Css 画一个三角形

```
.triangle{
  width:0;
  height:0;
  border-style:solid;
  border-width:0 25px 40px 25px;
  border-color:transparent transparent red red;
}
```

## Css 超出省略怎么写，三行超出省略怎么写

```
.single{
  width:200px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.multiline{
  display:-webkit-box;
  -weblkit-box-orient:vertical;
  -webkit-line-clamp:3;
  word-break:break-all;
  overflow:hidden;
  text-overflow:ellipsis;
}
```

## Css inherit、initial、unset 三者的区别

- inherit:每个 css 属性都有的一个特性，继承或者不继承 inherited:no
  - 默认继承的属性：所有元素可继承 visibility、cursor;
  - 内联元素可继承 letter-spacing、word-spacing、white-space、line-height、color、font、text-decoration、text-transform、direction;块状元素可继承:text-indent、text-align;
  - 列表元素可继承:list-style、list-style-type、list-style-position、list-style-image;border 属性不可继承，可通过 inherit 进行改变；
- inherit:用于设置 css 属性的默认值，可用于任何 css 样式
- unset:不设置，默认如果属性是可继承的 inherit，属性是非继承的为 initial

## 介绍下 Flex 布局，属性都有哪些，都是干啥的

父盒子：display:flex;flex-direction;flex-wrap 如何换行；flex-flow:direction 和 wrap 的简写；justify-content:主轴方向对齐方式；align-items:辅轴对齐方式；align-content:盒堆叠伸缩对齐方式
子盒子：flex-grow，order，flex-shrink，flex-basis，flex，align-self

<br/>

## 响应式布局用到的技术，移动端需要注意什么

- 媒体查询：根据媒体类型定义不同样式；
- 百分比布局，rem 布局，视口单位(vw/vh)
- 添加禁止浏览器主动缩放功能，设置 viewport
- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

## 移动端适配 1px 的问题

- 伪类+transform: scale(0.5);
- 背景渐变 ：background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, red))

## 居中为什么要使用 transform（为什么不使用 marginLeft/marginTop）

transform 是一个独立的层，margin 会导致重绘和回流

## 介绍 css3 中 position:sticky

设置了 sticky 的元素在屏幕范围内时位置不受定位影响，当该元素的位置将要偏移出范围时，定位会变成 fixed,根据 left,top 等属性成固定位置的效果。

## 清除浮动的方式

## transform 动画和直接使用 left、top 改变位置有什么优缺点

## 上下固定，中间滚动布局如何实现

flex,绝对定位

## 如何实现高度自适应

## em 和 px 的区别

## 说下盒模型的区别？介绍一下标准的 CSS 盒模型？border-box 和 content-box 有什么区别？

## Css 单位都有哪些？

## Css 实现多列等高布局，要求元素实际占用的高度以多列中较高的为准

## 一个标签的 class 样式的渲染顺序，id、class、标签、伪类的优先级

## css 如何实现动画

## Css 如何实现一个半圆

## 请画出 css 盒模型，基于盒模型的原理，说明相对定位、绝对定位、浮动实现样式是如何实现的？

## 列举出 css 选择器有哪些分类，并至少写出三个 css 选择器之间的区别，适用场景

## Css 实现 div 宽度自适应，宽高保持等比缩放

## ul 内部除最后一个 li 以外设置右边框效果

## flex:1 的完整写法是？分别是什么意思？

## 行内元素和块级元素有什么区别

## link 和@inmport 区别

## 怎样用 css 实现一个弹幕的效果，动手实现一下
