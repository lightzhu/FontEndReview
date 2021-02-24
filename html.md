# Html 题目汇总

## meta 元素都有什么

- charset:说明页面文件的字符编码, eg.``<meta charset=”utf-8”>`
- http-equiv:说明处理和显示页面的方式
  - refresh:每隔 5 秒重新加载一次页面 ``<meta http-equiv="refresh" content="5"/>`
  - content-type:把页面当作标准 html 页面处理，字符编码是 utf-8`<meta http-equiv="content-type" content="text/html charset=UTF-8"/>`
- name:application-name,说明项目名称;description,keywords,author 等`<meta name=”keywords”, content=”石油,勘探,计算”/>`
- name:`<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"/>`

```html
<meta charset="’utf-8′" /> 声明文档使用的字符编码
<meta http-equiv="”X-UA-Compatible”" content="”IE" ="edge,chrome" ="1″" />
优先使用 IE 最新版本和 Chrome
<meta name="”description”" content="”不超过150个字符”" /> 页面描述
<meta name="”keywords”" content="””" /> 页面关键词者
<meta name="”author”" content="”name," email@gmail.com” /> 网页作
<meta name="”robots”" content="”index,follow”" /> 搜索引擎抓取
<meta
  name="”viewport”"
  content="”initial-scale"
  ="1,"
  maximum-scale="3,"
  minimum-scale="1,"
  user-scalable="no”"
/>
为移动设备添加 viewport
<meta name="”apple-mobile-web-app-title”" content="”标题”" /> iOS 设备 begin
<meta name="”apple-mobile-web-app-capable”" content="”yes”" />
添加到主屏后的标题（iOS 6 新增） 是否启用 WebApp
全屏模式，删除苹果默认的工具栏和菜单栏
<meta
  name="”apple-itunes-app”"
  content="”app-id"
  ="myAppStoreID,"
  affiliate-data="myAffiliateData,"
  app-argument="myURL”"
/>
添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
<meta name="”apple-mobile-web-app-status-bar-style”" content="”black”" />
<meta name="”format-detection”" content="”telphone" ="no," email="no”" />
设置苹果工具栏颜色
<meta name="”renderer”" content="”webkit”" /> 启用360浏览器的极速模式(webkit)
<meta http-equiv="”X-UA-Compatible”" content="”IE" ="edge”" />
避免IE使用兼容模式
<meta http-equiv="”Cache-Control”" content="”no-siteapp”" /> 不让百度转码
<meta name="”HandheldFriendly”" content="”true”" />
针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
<meta name="”MobileOptimized”" content="”320″" /> 微软的老式浏览器
<meta name="”screen-orientation”" content="”portrait”" /> uc强制竖屏
<meta name="”x5-orientation”" content="”portrait”" /> QQ强制竖屏
<meta name="”full-screen”" content="”yes”" /> UC强制全屏
<meta name="”x5-fullscreen”" content="”true”" /> QQ强制全屏
<meta name="”browsermode”" content="”application”" /> UC应用模式
<meta name="”x5-page-mode”" content="”app”" /> QQ应用模式
<meta name="”msapplication-tap-highlight”" content="”no”" /> windows phone
点击无高光 <meta http-equiv="”pragma”" content="”no-cache”" /> 设置页面不缓存
<meta http-equiv="”cache-control”" content="”no-cache”" />
<meta http-equiv="”expires”" content="”0″" />
```

## script 的 async 跟 defer 的区别？

- 都是新开线程异步加载脚本
- defer:加载完之后不立即执行，等待 html 渲染完成再执行
- async:加载完之后立即执行，会阻塞 html 渲染线程

### 1、请说明 Html 布局元素的分类有哪些？边描述每种布局元素的应用场景

### 一、分类

**1) 内联元素:**

`span,a,b,strong,i,em,br,inut ,textarea`

本身属性为`display:inline`;

和其他行内元素从左到右在一行显示,不可以直接控制宽度、高度等其他相关 css 属性，但是可以直接设置内外边距的左右值

宽高是由本身内容大小决定的（文字、图片等)

只能容纳文本或者其他行内元素，不能嵌套块级元素

**2) 块状元素**

`div,h1-h6,hr,menu,ol,ul,li,dl,table,p,from`

本身属性为`display:block`;

独占一行，每一个块级元素都会从新的一行重新开始，从上到下排布可以直接控制宽度、高度等其他相关 css 属性，例如（padding 系列，margin 系列）

在不设置宽度的情况下，块级元素的宽度是它父级元素内容的宽度

在不设置高度的情况下，块级元素的高度是它本身内容的高度

**3) 内联块状元素**

内联块状元素综合了前两种的特性却又各有取舍。

不自动换行

能够识别`width`和`height`,`line-height`,`padding`,`marign`

默认排列方式为从左到右

### 二、应用场景

- 内联元素：用于不指定宽高，宽高由内容指定；
- 块状元素：用于指定宽高，标签占满一行；
- 内联块状元素：用于指定元素宽高，不占满一行

## 说说你了解的 HTML5 语义化标签？

很多时候我们写 HTML，为了方便都会直接使用 div 和 span 标签，再通过 class 来确定具体样式。网站哪一部分为标题，哪一部分为导航，哪一部分为头部和底部，都只能通过 class 进行确定但 class 命名规范却又没有一套统一的标准，因此导致很多时候无法确定整体网站的结构。因此，在 HTML5 出现后，添加了关于页面布局结构的新标签。而在 HTML 书写过程中，根据不同的内容使用合适的标签进行开发，即为语义化。在编程中，语义指的是一段代码的含义（这个 HTML 的元素有什么作用，扮演了什么样的角色）。HTML 语义元素清楚地向浏览器和开发者描述其意义，例如 <header>、<section>、<form> 、 <table> 以及 <img> 等。

## a 标签默认事件禁掉之后做了什么才实现了跳转

通过 location.href

```js
let a = doucument.getElementsByTagName('a')[0]
a.addEventlistener('click', () => {
  location.href = this.href
})
```

## 网站 SEO 怎么处理

- 网站结构布局优化:尽量简单、开门见山，提倡扁平化结构,控制网站的结构布局,把重要内容 HTML 代码放在最前，控制页面的大小，减少 http 请求，提高网站的加载速度
- 突出重要内容合理的设计 title、description 和 keywords，语义化书写 HTML 代码，符合 W3C 标准；正文标题要用 H 标签<img> 应使用 "alt" 属性加以说明，表格应该使用 <caption> 表格标题标签，需要强调是使用<strong>、<em> 标签，重要内容不要用 JS 输出，尽量少使用 iframe 框架
- 采用友情链接：在别人的网站导入自己网站的链接向各大搜索引擎登陆入口提交尚未收录站点；提高网站速度：网站速度是搜索引擎排序的一个重要指标；做好 404 页面。不仅是为了提高蜘蛛体验，也是为了用户体验的更好

## html 标签 b 和 strong 的区别

两者都是对文本进行加粗，b 元素仅仅是样式风格的加粗，strong 具有比较重要的意思，提醒读者或终端注意，为了达到这个目的，浏览器才让它加粗显示。所以 strong 比 b 更具语义化。

## 说一下减少 dom 数量的办法？一次性给你大量的 dom 怎么优化？

- 减少 DOM 数量的方法

1. 可以使用伪元素，阴影实现的内容尽量不使用 DOM 实现，如清除浮动、样式实现等；
2. 按需加载，减少不必要的渲染；
3. 结构合理，语义化标签；

- 大量 DOM 时的优化当对 Dom 元素进行一系列操作时，对 Dom 进行访问和修改 Dom 引起的重绘和重排都比较消耗性能，所以关于操作 Dom,应该从以下几点出发：

  1.缓存 Dom 对象首先不管在什么场景下。操作 Dom 一般首先会去访问 Dom，尤其是像循环遍历这种时间复杂度可能会比较高的操作。那么可以在循环之前就将主节点，不必循环的 Dom 节点先获取到，那么在循环里就可以直接引用，而不必去重新查询。

```js
let rootElem = document.querySelector('#app')
let childList = rootElem.child // 假设全是dom节点
for (let i = 0; i < childList.length; j++) {
  /**
   * 根据条件对应操作
   */
}
```

2.文档片段利用`document.createDocumentFragment()`方法创建文档碎片节点，创建的是一个虚拟的节点对象。向这个节点添加 dom 节点，修改 dom 节点并不会影响到真实的 dom 结构。我们可以利用这一点先将我们需要修改的 dom 一并修改完，保存至文档碎片中，然后用文档碎片一次性的替换真是的 dom 节点。与虚拟 dom 类似，同样达到了不频繁修改 dom 而导致的重排跟重绘的过程。

```js
let fragment = document.createDocumentFragment()
const operationDomHandle = (fragment) => {
  // 操作
}
operationDomHandle(fragment)
// 然后最后再替换
rootElem.replaceChild(fragment, oldDom)
```

这样就只会触发一次回流，效率会得到很大的提升。如果需要对元素进行复杂的操作（删减、添加子节点），那么我们应当先将元素从页面中移除，然后再对其进行操作，或者将其复制一个（cloneNode()），在内存中进行操作后再替换原来的节点。

```js
var clone = old.cloneNode(true)
operationDomHandle(clone)
rootElem.replaceChild(clone, oldDom)
```

3.用 innerHtml 代替高频的 appendChild 4.最优的 layout 方案批量读，一次性写。先对一个不在 render tree 上的节点进行操作，再把这个节点添加回 render tree。这样只会触发一次 DOM 操作。 使用`requestAnimationFrame()`，把任何导致重绘的操作放入`requestAnimationFrame` 5.虚拟 Dom js 模拟 DOM 树并对 DOM 树操作的一种技术。virtual DOM 是一个纯 js 对象（字符串对象），所以对他操作会高效。利用 virtual dom，将 dom 抽象为虚拟 dom，在 dom 发生变化的时候先对虚拟 dom 进行操作，通过 dom diff 算法将虚拟 dom 和原虚拟 dom 的结构做对比，最终批量的去修改真实的 dom 结构，尽可能的避免了频繁修改 dom 而导致的频繁的重排和重绘。

## Html5 有哪些新特性？如何处理 Html5 新标签的浏览器兼容问题？如何区分 Html 和 Html5?

### 一、Html5 新特性

1. 拖拽释放(Drag and drop) API
2. 语义化更好的内容标签（header,nav,footer,aside,article,section）
3. 音频、视频 API(audio,video)
4. 画布(Canvas) API
5. 地理(Geolocation) API
6. 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
7. sessionStorage 的数据在浏览器关闭后自动删除
8. 表单控件，calendar、date、time、email、url、search
9. 新的技术 webworker, websocket, Geolocation

### 二、Html5 兼容问题处理

- 1.使用 DOM 操作来添加这些标
- 2.封装好的 js 库 --- html5shiv.js

```html
<!-- 引入即可 -->
<script src="js/html5shiv.js"></script>
```

### 三、如何区分 Html 和 Html5

#### 1.文档类型声明

- Html 声明：`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
- Html5 声明：`<!doctype html>`

#### 2.结构语义

- Html:没有体现结构语义化的标签，通常都是这样来命名的 `<div id="header"></div>` ，这样表示网站的头部。
- Html5:在语义上却有很大的优势，提供了一些新的 HTML5 标签比如: `article、footer、header、nav、section` ，这些通俗易懂。

### 请说明 Html 布局元素的分类有哪些？并描述每种布局元素的应用场景

1. 内联元素:span,a,b,strong,i,em,br,inut ,textarea 本身属性为 display:inline;和其他行内元素从左到右在一行显示,不可以直接控制宽度、高度等其他相关 css 属性，但是可以直接设置内外边距的左右值宽高是由本身内容大小决定的（文字、图片等)只能容纳文本或者其他行内元素，不能嵌套块级元素
2. 块状元素: div,h1-h6,hr,menu,ol,ul,li,dl,table,p,from 本身属性为 display:block;独占一行，每一个块级元素都会从新的一行重新开始，从上到下排布 可以直接控制宽度、高度等其他相关 css 属性，例如（padding 系列，margin 系列）在不设置宽度的情况下，块级元素的宽度是它父级元素内容的宽度在不设置高度的情况下，块级元素的高度是它本身内容的高度
3. 内联块状元素:内联块状元素综合了前两种的特性却又各有取舍,不自动换行,能够识别 width 和 height,line-height,padding,marign 默认排列方式为从左到右

### 一、Html5 新特性

1. 拖拽释放(Drag and drop) API
2. 语义化更好的内容标签（header,nav,footer,aside,article,section）
3. 音频、视频 API(audio,video)
4. 画布(Canvas) API
5. 地理(Geolocation) API
6. 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
7. sessionStorage 的数据在浏览器关闭后自动删除
8. 表单控件，calendar、date、time、email、url、search
9. 新的技术 webworker, websocket, Geolocation

### 如何实现浏览器内多个标签页之间的通信?

实现多个标签页之间的通信，本质上都是通过中介者模式来实现的。因为标签页之间没有办法直接通信，因此我们可以找一个中介者， 让标签页和中介者进行通信，然后让这个中介者来进行消息的转发。

- 第一种实现的方式是使用 websocket 协议，因为 websocket 协议可以实现服务器推送，所以服务器就可以用来当做这个中介者。标签页通过向服务器发送数据，然后由服务器向其他标签页推送转发。

- 第二种是使用 ShareWorker 的方式，shareWorker 会在页面存在的生命周期内创建一个唯一的线程，并且开启多个页面也只会使用同一个线程。这个时候共享线程就可以充当中介者的角色。标签页间通过共享一个线程，然后通过这个共享的线程来实现数据的交换。

- 第三种方式是使用 localStorage 的方式，我们可以在一个标签页对 localStorage 的变化事件进行监听，然后当另一个标签页修改数据的时候，我们就可以通过这个监听事件来获取到数据。这个时候 localStorage 对象就是充当的中介者的角色。

- 还有一种方式是使用 postMessage 方法，如果我们能够获得对应标签页的引用，我们就可以使用 postMessage 方法，进行通信。
