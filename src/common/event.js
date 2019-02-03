import {hasOwn} from '../utils/base';
import {checkIsArray} from '../utils/checkVarType'
class JcEvent {
  constructor () {
    this._eventList = {};
  }
  trigger ({type, playLoad}) {
    const {_eventList} = this;
    const curEventList = _eventList[type];
    if (checkIsArray(curEventList)) {
      curEventList.forEach(cb => {
        cb.call(null, playLoad)
      })
    }
  }
  on ({type, fn}) {
    const {_eventList} = this;
    if (!hasOwn(_eventList, type)) {
      console.warn('绑定的事件名 与基础对象的原型对象有冲突')
    } else {
      let curEventList = _eventList[type];
      if(curEventList) {
        curEventList.push(fn)
      } else {
        _eventList[type] = [fn]
      }
    }
  }
  off ({type, fn}) {
    const {_eventList} = this;
    if (!hasOwn(_eventList, type)) {
      console.log('不存在 此事件类型 或 此类型和原型对象有冲突')
    } else {
      if (!!fn) {
        this._eventList[type] = [];
      } else {
        const index = _eventList[type].indexOf(fn);
        if (index === -1) {
          return false
        }
        _eventList[type].splice(index, 1)
      }
    }
  }
  once ({type, fn}) {
    const {on, off} = this;
    const fixFn = (playLoad) => {
      fn.call(null, playLoad)
      off({
        type,
        fixFn
      });
      on({
        type,
        fn
      })
    };
  }
};
export default JcEvent
