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
const global = window;
const doc = global.document;
const body = doc.body;
/*
*  _x _y 初始坐标
* _dx _dy 坐标增量
*
*
*/
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
    this.findMouseLc = this.findMouseLc.bind(this);
    this.init();
  }
  checkInPc () {
    const {isPc} = checkIsPc();
    return isPc
  }
  findMouseLc (e) {
	  const {pageX, pageY} = e;
	  const {_x, _y} = this;
	  const dx = pageX - _x;
	  const dy = pageY - _y;
	  this._dx = dx;
	  this._dy = dy;
	  this._mvX = pageX;
	  this._mvY = pageY;
	  const playLoad = {
		  dx,
		  dy,
		  mvX: pageX,
		  mvY: pageY,
		  x: this._x,
		  y: this._y
	  };
	  return playLoad
  }
  captureMouseStart (e) {
	  const {captureMouseMove, captureMouseEnd} = this;
	  const elem = body;
	  const {pageX, pageY} = e;
	  this._x = this._mvX = pageX;
	  this._y = this._mvY= pageY;
    e.stopPropagation();
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
    const playLoad = this.findMouseLc(e);
    e.preventDefault();
    // 其他情况
    e.stopPropagation();
    this.actionEvent.trigger({
      type: 'state:change',
      playLoad
    })
  }
  captureMouseEnd (e) {
	  const {captureMouseMove, captureMouseEnd} = this;
	  const playLoad = this.findMouseLc(e);
	  const elem = body;
    // e.stopPropagation();
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
	  this.actionEvent.trigger({
      type: 'state:end',
      playLoad
    })
  }
  captureStateEnd(fn) {
    const self = this;
    this.actionEvent.on({
      type: 'state:end',
      fn: fn.bind(self)
    })
  }
  captureStateChange(fn) {
    const self = this;
    this.actionEvent.on({
      type: 'state:change',
      fn: fn.bind(self)
    })
  }
  offCaptureStateChange (fn) {
    const self = this;
    this.actionEvent.off({
      type: 'state:change',
      fn: fn.bind(self)
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
