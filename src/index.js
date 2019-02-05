import './css/main.scss'
import CaptureMouse from './main';
import {getElement, sgElemCss, createdElem} from './utils/dom';
const global = window;
const doc = global.document;
const insertControlDot = (fartherNone) => {
  const childNodeStr = '<span class="control-content-lc jc-capture-lt"></span>' +
            '<span class="control-content-lc jc-capture-lm"></span>' +
            '<span class="control-content-lc jc-capture-rt"></span>' +
            '<span class="control-content-lc jc-capture-rm"></span>' +
            '<span class="control-content-lc jc-capture-lb"></span>' +
            '<span class="control-content-lc jc-capture-rb"></span>' +
            '<span class="control-content-lc jc-capture-bm"></span>' +
            '<span class="control-content-lc jc-capture-tm"></span>';
  const childNodeList = [
    {
      tag: 'span',
      classNames: 'control-content-lc jc-capture-lt'
    }, {
      tag: 'span',
      classNames: 'control-content-lc jc-capture-lm'
    },
    {
      tag: 'span',
      classNames: 'control-content-lc jc-capture-rt'
    }, {
      tag: 'span',
      classNames: 'control-content-lc jc-capture-rm'
    }, {
      tag: 'span',
      classNames: 'control-content-lc jc-capture-lb'
    }, {
      tag: 'span',
      classNames: 'control-content-lc jc-capture-rb'
    }, {
      tag: 'span',
      classNames: 'control-content-lc jc-capture-bm'
    }, {
      tag: 'span',
      classNames: 'control-content-lc jc-capture-tm'
    }
  ];
  const xmlRoot = doc.createDocumentFragment();
  childNodeList.forEach(nodeDesc => {
    xmlRoot.appendChild(createdElem(nodeDesc))
  });
  fartherNone.appendChild(xmlRoot);
};
const initSingleItem = () => {
  const controlView = getElement('.mouse-handle-view');
  insertControlDot(controlView);
  const elem = getElement('.jc-capture-rb');
  const captureA = new CaptureMouse(elem);
  let left = 0;
  let top = 0;
  console.log(sgElemCss(controlView, 'left'), sgElemCss(controlView, 'right'));
  captureA.captureStateChange(function (playLoad) {
	  const {dx, dy} = playLoad;
	  let curLeft = left + dx;
	  let curTop = top + dy;
	  sgElemCss(controlView, {
	  	left: `${curLeft}px`,
		  top: `${curTop}px`
	  });
  });
  captureA.captureStateEnd(function () {
  	const {_dx, _dy} = this;
  	left = left + _dx;
  	top = top + _dy;
	  sgElemCss(controlView, {
		  left: `${left}px`,
		  top: `${top}px`
	  });
  })
}
const init = () => {
  initSingleItem();
};
init();
