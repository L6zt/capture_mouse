const toString = (waitCheckVar) => {
  return Object.prototype.toString.call(waitCheckVar)
};
// 检查元素 是不是数字
const checkIsNumber = (waitCheckVar) => {
  return toString(waitCheckVar) === '[object Number]'
};
// 检查是不是对象
const checkIsObject = (waitCheckVar) => {
  return toString(waitCheckVar) === '[object Object]'
};
// 检查是不是数组
const checkIsArray = (waitCheckvar) => {
  return toString(waitCheckvar) === '[object Array]'
};                                                                                                                
// 检查是不是字符串
const checkIsString = (waitCheckVar) => {
  return toString(waitCheckVar) === '[object String]'
};
// 检查是不是布尔值
const checkIsBoolean = (waitCheckVar) => {
  if (waitCheckVar === true || waitCheckVar === false) {
  	return true
  }
  return false
};


 
