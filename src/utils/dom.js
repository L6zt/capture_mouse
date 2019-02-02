import {checkIsNumber, checkIsObject} from './checkVarType.js';
const global = window;
const doc = global.document;
const getComputedStyle = doc.defaultView.getComputedStyle;
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
export const getElement = (selector) => {
  return doc.querySelector(selector)
};
// 获取所有元素事件
export const getElementS = (selector) => {
  return doc.querySelectorAll(selector)
};
// 绑定事件
export const on = ({type, fn, elem}) => {
  if (browserEventType === 1) {
    elem.addEventListener(type, fn, false)
  } else {
  	elem.attachEvent(`on${type}`, fn)
  }
};
// 解除绑定事件
export const off = ({type, fn, elem}) => {
  if (browserEventType === 1) {
    elem.removeEventListener(type, fn);
  }
  elem.detachEvent(`on${type}`, fn);
};
// 绑定一次
export const once = ({type, fn, elem}) => {
  const fixFn = (e) => {
    fn(e);
    off({elem, type, fn: fixFn})
  };
  on({type, fn: fixFn, elem})
};
//获取元素相对与浏览器视口位置
export const getElemOffsetToView = (elem) => {
  return elem.getBoundingClientRect()
};
// 获取元素相对与页面左上角位置
export const getElemOffsetToPage = (elem) => {
  let scrollRoot = doc.documentElement || doc.body.parentNode;
  const elemOffset = getElemOffsetToView(elem);
  let {scrollLeft, scrollTop} = scrollRoot;
  if (checkIsNumber(scrollLeft)) {
  	return Object.assign(elemOffset, {
  		top: scrollTop + elemOffset.top,
		  left: scrollTop + elemOffset.left
	  })
  };
  scrollRoot = doc.body;
  return Object.assign(elemOffset, {
  	top: scrollRoot.scrollTop + elemOffset.top,
	  left: scrollRoot.scrollLeft + elemOffset.left
  });
};
// 获取元素css样式或设置css样式
export const sgElemCss = () => {
  const elem = arguments[0];
  const arg = arguments[1];
  // 给元素设置 属性
  if (checkIsObject(arg)) {
  	let inlineStyle = elem.cssText;
  	for (let key in arg) {
  		inlineStyle +=`;${key}:${arg[key]}`;
	  }
	  elem.cssText = inlineStyle;
  } else {
  	if (arg === undefined) {
  		return undefined
	  }
	  return getComputedStyle(elem, null).getPropertyValue(arg)
  }
};
// 获取元素属性
export const getElemAttr = (elem, attr) => {
  return elem.getAttribute(attr)
};
export const setElemAttr = (elem, attrs) => {
  for (let key in attrs) {
  	let value = attrs[key];
  	elem.setAttribute(key, value);
  }
};
// 获取元素 className
export const addElemClass = (elem, className) => {
  let classList = getElemAttr(elem, 'className').join(' ');
  const classWaitAddList = className.join(' ');
  let sureClassAddList = '';
  classWaitAddList.forEach(className => {
  	let index = classList.indexOf(className);
  	if (index === -1) {
  		sureClassAddList += className
	  }
  });
  if(sureClassAddList === '') {
  	return false
  }
  classList += sureClassAddList;
  setElemAttr('className', sureClassAddList.join(' '));
};
// 删除元素 className
export const removeClass = (elem, className) => {
  let classListStr = getElemAttr(elem, 'className');
  if (classListStr === undefined) {
  	return false
  }
  let classList = classListStr.join(' ');
  const classWaitRemoveList = className.join(' ');
  classListStr = classList.filter(className => classWaitRemoveList.indexOf(className) !== -1).join(' ');
  setElemAttr(elem, classListStr);
}
