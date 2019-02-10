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
  let left = sgElemCss(controlView, 'left');
  let top = sgElemCss(controlView, 'top');
  let width = sgElemCss(controlView, 'width');
  let height = sgElemCss(controlView, 'height');
  captureA.captureStateChange(function (playLoad) {
	  const {dx, dy} = playLoad;
	  let curWidth = width + dx;
	  let curHeight = height + dy;
    if (curWidth < 24) curWidth = 24;
    if (curHeight < 24) curHeight = 24;
    sgElemCss(controlView, {
      width: `${curWidth}px`,
      height: `${curHeight}px`
    });
  });
  captureA.captureStateEnd(function () {
  	const {_dx, _dy} = this;
    width = width + _dx;
    height = height + _dy;
    if (width < 24) width = 24;
    if (height < 24) height = 24;
    sgElemCss(controlView, {
      width: `${width}px`,
      height: `${height}px`
    })
  })
}
const init = () => {
  initSingleItem();
};
init();
