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
import {checkIsPc} from './utils/browser';
import JcEvent from './common/event';
console.log(checkIsPc)
class CaptureMouse{
  constructor (elem, options) {
    this.elem = elem;
    this._isPc = this.checkInPc();
    this._defaultOptions = {};
    this.options = Object.assign({}, this._defaultOptions, options || {});
    this._x = 0;
    this._y = 0;
    this._mvX = 0;
    this._mvY = 0;
    this._dx = 0;
    this._dy = 0;
    this.actionEvent = new JcEvent();
	  this.captureMouseStart = this.captureMouseStart.bind(this);
	  this.captureMouseMove = this.captureMouseMove.bind(this);
    this.captureMouseEnd = this.captureMouseEnd.bind(this);
    this.init();
  }
  checkInPc () {
    const {isPc} = checkIsPc();
    return isPc
  }
  captureMouseStart (e) {
	  const {elem, captureMouseMove, captureMouseEnd} = this;
	  const {pageX, pageY} = e;
	  this._x = this._mvX = pageX;
	  this._y = this._mvY= pageY;
	  on({
		  elem,
		  type: 'mousemove',
		  fn: captureMouseMove
	  });
	  on({
		  elem: window,
		  type: 'mouseup',
		  fn: captureMouseEnd
	  });
  }
  captureMouseMove (e) {
    e.preventDefault();
    // 其他情况
    e.stopPropagation();
    const {pageX, pageY} = e;
    const {_x, _y} = this;
    const dx = pageX - _x;
    const dy = pageY - _y;
    this._dx = dx;
    this._dy = dy;
    this._mvX = pageX;
    this._mvY = pageY;
    this.actionEvent.trigger({
      type: 'state:change',
      playLoad: {
        dx,
        dy,
        mvX: pageX,
        mvY: pageY,
        x: this._x,
        y: this._y
      }
    })
  }
  captureMouseEnd () {
	  const {elem, captureMouseMove, captureMouseEnd} = this;
	  console.log('off --- off');
	  off({
      elem,
      type: 'mousemove',
      fn: captureMouseMove
    });
	  off({
      elem: window,
      type: 'mouseup',
      fn: captureMouseEnd
    });
  }
  captureSateChange(fn) {
    this.actionEvent.on({
      type: 'state:change',
      fn
    });
  }
  offCaptureSateChange (fn) {
    this.actionEvent.off({
      type: 'state:change',
      fn
    })
  }
  init () {
    const {_isPc, elem, captureMouseStart} = this;
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
};
export default CaptureMouse
