/*
*
*
*
*
*/
/*
*  事件列表 mousedown mouseup mousemove touchstart touchmove touchend
*
*/
import {checkIsPc} from './utils/browser'
class CaptureMouse {
  constructor (elem, options) {
    this._IsPc = this.checkInPc();
    this._defaultOptions = {};
    this.options = Object.assign({}, this._defaultOptions, options);
    this._x = 0;
    this._y = 0;
    this._dx = 0;
    this._dy = 0;
    this.init();
  }
  checkInPc () {
    const {flag} = checkIsPc();
    return flag
  }
  captureMouseStart () {
  
  }
  captureMouseMove () {
  
  }
  captureMouseEnd () {
  
  }
  init () {
  
  }
  destroy () {
  
  }
}
