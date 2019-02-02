export const toString = (waitCheckVar) => {
  return Object.prototype.toString.call(waitCheckVar)
};
// 检查元素 是不是数字
export const checkIsNumber = (waitCheckVar) => {
  return toString(waitCheckVar) === '[object Number]'
};
// 检查是不是对象
export const checkIsObject = (waitCheckVar) => {
  return toString(waitCheckVar) === '[object Object]'
};
// 检查是不是数组
export const checkIsArray = (waitCheckVar) => {
  return toString(waitCheckVar) === '[object Array]'
};                                                                                                                
// 检查是不是字符串
export const checkIsString = (waitCheckVar) => {
  return toString(waitCheckVar) === '[object String]'
};
// 检查是不是布尔值
export const checkIsBoolean = (waitCheckVar) => {
  if (waitCheckVar === true || waitCheckVar === false) {
  	return true
  }
  return false
};


 
