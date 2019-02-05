export const hasOwn = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
export const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/, '');
};
