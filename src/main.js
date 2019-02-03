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
import {on, off, once} from './utils/dom';
import {checkIsPc} from './utils/browser'
class CaptureMouse {
  constructor (elem, options) {
    this.elem = elem;
    this._isPc = this.checkInPc();
    this._defaultOptions = {};
    this.options = Object.assign({}, this._defaultOptions, options);
    this._x = 0;
    this._y = 0;
    this._mvX = 0;
    this._mvY = 0;
    this._dx = 0;
    this._dy = 0;
    this.init();
  }
  checkInPc () {
    const {flag} = checkIsPc();
    return flag
  }
  captureMouseStart (e) {
	  const {elem, captureMouseStart, captureMouseMove, captureMouseEnd} = this;
	  const {pageX, pageY} = e;
	  this._x = this._mvX = pageX;
	  this._y = this._mvY= pageY;
	  on({
		  elem,
		  type: 'mousemove',
		  fn: captureMouseMove
	  });
	  on({
		  elem,
		  type: 'mouseup',
		  fn: captureMouseEnd
	  });
  }
  captureMouseMove (e) {
    const {pageX, pageY} = e;
    const {_x, _y} = e;
    const dx = pageX - _x;
    const dy = pageY - _y;
    this._dx = dx;
    this._dy = dy;
    this._mvX = pageX;
    this._mvY = pageY;
  }
  captureMouseEnd () {
	  const {elem, captureMouseMove, captureMouseEnd} = this;
	  off({
      elem,
      type: 'mousemove',
      fn: captureMouseMove
    });
	  off({
      elem,
      type: 'mouseup',
      fn: captureMouseEnd
    });
  }
  init () {
    const {_isPc, elem, captureMouseStart, captureMouseMove, captureMouseEnd} = this;
    if (_isPc) {
      on({
        elem,
        type: 'mousedown',
        fn: captureMouseStart
      })
    } else {
    
    }
  }
  destroy () {
    const {_isPc, captureMouseStart, elem} = this;
    if (_isPc) {
      off({
        elem,
        type: 'mouseup',
        fn: captureMouseStart
      })
    }
  }
}
