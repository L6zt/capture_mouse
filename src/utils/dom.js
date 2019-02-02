const global = window;
const doc = global.document;
let browserEventType = 0;
// 检测 当前浏览器支持的事件添加模式
const findBrowserEventType = () => {
  // w3c
  if (global.addEventListener) {
    return 0
  }
  // ie模式
  return 1
};
browserEventType = findBrowserEventType();
// 获取单个元素
const getElement = (selector) => {
  return doc.querySelector(selector)
};
// 获取所有元素事件
const getElementS = (selector) => {
  return doc.querySelectorAll(selector)
};
// 绑定事件
const addEventListener = ({type, fn, elem}) => {
  if (browserEventType === 1) {
    elem.addEventListener(type, fn, false)
  } else {
  	elem.attachEvent(`on${type}`, fn)
  }
};
//获取元素相对与浏览器视口位置
const getElemOffsetToView = (elem) => {
  return elem.getBoundingClientRect()
};
// 获取元素相对与页面左上角位置
const getElemOffsetToPage = (elem) => {
  const scrollRoot = doc.documentElement || doc.body.parentNode;
};
// 检测页面的滚动位置
