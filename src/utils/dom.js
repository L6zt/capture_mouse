import {checkIsNumber, checkIsObject, checkIsArray} from './checkVarType.js';
import {trim} from './base.js';
const global = window;
const doc = global.document;
const getComputedStyle = doc.defaultView.getComputedStyle;
let browserEventType = 0;
// 检测 当前浏览器支持的事件添加模式
const findBrowserEventType = () => {
  // w3c
  if (global.addEventListener) {
    return 1
  }
  // ie模式
  return 0
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
  if (elem && elem.nodeType === 1) {
  } else {
	  console.warn('检查元素 是不是 node节点');
	  return false
  }
  if (browserEventType === 1) {
    elem.addEventListener(type, fn, false)
  } else {
  	elem.attachEvent(`on${type}`, fn)
  }
};
// 解除绑定事件
export const off = ({type, fn, elem}) => {
  if (elem && elem.nodeType === 1) {
  } else {
    console.warn('检查元素 是不是 node节点')
  }
  if (browserEventType === 1) {
    elem.removeEventListener(type, fn, false);
  } else {
	  elem.detachEvent(`on${type}`, fn);
  }
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
export const sgElemCss = function () {
  const elem = arguments[0];
  const arg = arguments[1];
  const getIsPx = /px$/i;
  let getPropValue = null;
  // 给元素设置 属性
  if (checkIsObject(arg)) {
  	let inlineStyle = elem.style.cssText || '';
  	for (let key in arg) {
  		inlineStyle +=`;${key}:${arg[key]}`;
	  }
	  elem.style.cssText = inlineStyle;
  } else {
  	if (arg === undefined) {
  		return undefined
	  }
	  getPropValue = getComputedStyle(elem, null).getPropertyValue(arg);
  	if (getIsPx.test(getPropValue)) {
  		getPropValue = getPropValue.replace(getIsPx, '');
  		getPropValue = Number(getPropValue);
	  }
	  return getPropValue
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
  let classList = (getElemAttr(elem, 'class') || '').split(/\s{1,}/);
  const classWaitAddList = className.split(/\s{1,}/);
  let sureClassAddList = '';
  classWaitAddList.forEach(className => {
  	let index = classList.indexOf(className);
  	if (index === -1) {
  		sureClassAddList = sureClassAddList + ' ' + className
	  }
  });
  if(sureClassAddList === '') {
  	return false
  }
  sureClassAddList = classList.join(' ') + ' ' + sureClassAddList;
  sureClassAddList = trim(sureClassAddList);
  setElemAttr(elem, {
    class: sureClassAddList
  });
};
// 删除元素 className
export const removeClass = (elem, className) => {
  let classListStr = (getElemAttr(elem, 'class') || '');
  if (classListStr === undefined) {
  	return false
  }
  let classList = classListStr.split(/\s{1,}/);
  const classWaitRemoveList = className.split(/\s{1,}/);
  classListStr = classList.filter(className => classWaitRemoveList.indexOf(className) !== -1).join(' ');
  setElemAttr(elem, {
    class: classListStr
  })
};
export const createdElem = function (elemDesc) {
  const {
    tag,
    classNames,
	  style,
	  props,
	  childs,
    text
  } = elemDesc;
  // 根结点
  const rootNode = arguments[1] || null;
  const elem = doc.createElement(tag);
  if (text) {
    const textNode = doc.createTextNode(text);
    if (rootNode) {
      rootNode.appendChild(textNode)
    }
    return elem
  }
  if (checkIsObject(elemDesc)) {
    if (style) {
      sgElemCss(elem, style);
    }
    if (props) {
      setElemAttr(elem, props)
    }
    if (classNames) {
      addElemClass(elem, classNames)
    }
    if (childs) {
      if (checkIsArray(childs)) {
        childs.forEach(elemDesc => {
          createdElem(elemDesc, elem);
        })
      }
    }
    if(rootNode) {
      rootNode.appendChild(elem);
    }
    return elem
  }
  console.warn('元素描述 是否正确')
};
