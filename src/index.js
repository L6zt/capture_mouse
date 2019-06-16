import './css/main.scss'
import CaptureMouse from './main';
import {getElement, sgElemCss, createdElem} from './utils/dom';
const global = window;
const doc = global.document;
const insertControlDot = (fartherNone) => {
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
const init= () => {
  const controlView = getElement('.mouse-handle-view');
  insertControlDot(controlView);
  const rbElem = getElement('.jc-capture-rb');
  const tmElem = getElement('.jc-capture-bm');
  const bmElem = getElement('.jc-capture-tm');
  const lmElem = getElement('.jc-capture-lm');
  const rmElem = getElement('.jc-capture-rm');
  const rtElem = getElement('.jc-capture-rt');
  const ltElem = getElement('.jc-capture-lt');
  const lbElem = getElement('.jc-capture-lb');
  const captureControlView = new CaptureMouse(controlView);
  let left = sgElemCss(controlView, 'left');
  let top = sgElemCss(controlView, 'top');
  let width = sgElemCss(controlView, 'width');
  let height = sgElemCss(controlView, 'height');
  const initCaptureRb = () => {
    const captureRbElem = new CaptureMouse(rbElem);
    captureRbElem.captureStateChange(function (playLoad) {
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
    captureRbElem.captureStateEnd(function () {
      const {_dx, _dy} = this;
      width = width + _dx;
      height = height + _dy;
      if (width < 24) width = 24;
      if (height < 24) height = 24;
      sgElemCss(controlView, {
        width: `${width}px`,
        height: `${height}px`
      })
    });
  };
  const intCaptureMainTree = () => {
    const captureRbElem = new CaptureMouse(rbElem);
  
    captureControlView.captureStateChange(function (playLoad) {
      const {dx, dy} = playLoad;
      let curLeft = left + dx;
      let curTop = top + dy;
      sgElemCss(controlView, {
        left: `${curLeft}px`,
        top: `${curTop}px`
      })
    });
    captureControlView.captureStateEnd(function (playLoad) {
      const {_dx, _dy} = this;
      left = left + _dx;
      top = top + _dy;
      console.log('end', left, top);
      sgElemCss(controlView, {
        left: `${left}px`,
        top: `${top}px`
      })
    })
  };
  const initCaptureTm = () => {
    const captureTmElem = new CaptureMouse(tmElem);
    captureTmElem.captureStateChange(function (playLoad) {
      const {dx, dy} = playLoad;
      let curHeight = height - dy;
      let curTop = top + dy;
      if (curHeight < 24) curHeight = 24;
      sgElemCss(controlView, {
        height: `${curHeight}px`,
        top: `${curTop}px`
      });
    });
    captureTmElem.captureStateEnd(function () {
      const {_dx, _dy} = this;
      height = height - _dy;
      top = top + _dy;
      if (height < 24) height = 24;
      sgElemCss(controlView, {
        height: `${height}px`,
        top: `${top}px`
      })
    });
  };
  const initCaptureBm = () => {
    const captureBmElem = new CaptureMouse(bmElem);
    captureBmElem.captureStateChange(function (playLoad) {
      const {dx, dy} = playLoad;
      let curHeight = height + dy;
      if (curHeight < 24) curHeight = 24;
      sgElemCss(controlView, {
        height: `${curHeight}px`
      });
    });
    captureBmElem.captureStateEnd(function () {
      const {_dx, _dy} = this;
      height = height + _dy;
      if (width < 24) width = 24;
      if (height < 24) height = 24;
      sgElemCss(controlView, {
        height: `${height}px`
      })
    });
  };
  const initCaptureRm = () => {
    const captureRmElem = new CaptureMouse(rmElem);
    captureRmElem.captureStateChange(function (playLoad) {
      const {dx, dy} = playLoad;
      let curWidth = width + dx;
      if (curWidth < 24) curWidth = 24;
      sgElemCss(controlView, {
        width: `${curWidth}px`
      });
    });
    captureRmElem.captureStateEnd(function () {
      const {_dx, _dy} = this;
      width = width + _dx;
      if (width < 24) width = 24;
      sgElemCss(controlView, {
        width: `${width}px`
      })
    });
  };
  const initCaptureLm = () => {
    const captureLmElem = new CaptureMouse(lmElem);
    captureLmElem.captureStateChange(function (playLoad) {
      const {dx, dy} = playLoad;
      let curWidth = width - dx;
      let curLeft = left + dx;
      if (curWidth < 24) curWidth = 24;
      sgElemCss(controlView, {
        width: `${curWidth}px`,
        left: `${curLeft}px`
      });
    });
    captureLmElem.captureStateEnd(function () {
      const {_dx, _dy} = this;
      width = width - _dx;
      left = left + _dx;
      if (width < 24) width = 24;
      sgElemCss(controlView, {
        width: `${width}px`,
        left: `${left}px`
      })
    });
  };
  const initCaptureRt = () => {
    const captureLmElem = new CaptureMouse(rtElem);
    captureLmElem.captureStateChange(function (playLoad) {
      const {dx, dy} = playLoad;
      let curWidth = width + dx;
      let curHeight = height - dy;
      let curTop = top + dy;
      if (curWidth < 24) curWidth = 24;
      if (curHeight < 24) curHeight = 24;
      sgElemCss(controlView, {
        width: `${curWidth}px`,
        height: `${curHeight}px`,
        top: `${curTop}px`
      });
    });
    captureLmElem.captureStateEnd(function () {
      const {_dx, _dy} = this;
      width = width + _dx;
      height = height - _dy;
      top = top + _dy;
      if (width < 24) width = 24;
      if (height < 24) height = 24;
      sgElemCss(controlView, {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`
      })
    });
  };
  const initCaptureLb = () => {
    const captureLbElem = new CaptureMouse(lbElem);
    captureLbElem.captureStateChange(function (playLoad) {
      const {dx, dy} = playLoad;
      let curWidth = width - dx;
      let curHeight = height + dy;
      let curLeft = left + dx;
      if (curWidth < 24) curWidth = 24;
      if (curHeight < 24) curHeight = 24;
      sgElemCss(controlView, {
        width: `${curWidth}px`,
        height: `${curHeight}px`,
        left: `${curLeft}px`
      });
    });
    captureLbElem.captureStateEnd(function () {
      const {_dx, _dy} = this;
      width = width - _dx;
      height = height + _dy;
      if (width < 24) width = 24;
      if (height < 24) height = 24;
      sgElemCss(controlView, {
        width: `${width}px`,
        height: `${height}px`,
      })
    });
  };
  const initCaptureLt = () => {
    const captureLtElem = new CaptureMouse(ltElem);
    captureLtElem.captureStateChange(function (playLoad) {
      const {dx, dy} = playLoad;
      let curWidth = width - dx;
      let curHeight = height - dy;
      let curTop = top + dy;
      let curLeft = left + dx;
      if (curWidth < 24) curWidth = 24;
      if (curHeight < 24) curHeight = 24;
      sgElemCss(controlView, {
        width: `${curWidth}px`,
        height: `${curHeight}px`,
        top: `${curTop}px`,
        left: `${curLeft}px`
      });
    });
    captureLtElem.captureStateEnd(function () {
      const {_dx, _dy} = this;
      width = width - _dx;
      height = height - _dy;
      top = top + _dy;
      left = left + _dx;
      if (width < 24) width = 24;
      if (height < 24) height = 24;
      sgElemCss(controlView, {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`
      })
    });
  };
  initCaptureRb();
  initCaptureTm();
  initCaptureBm();
  initCaptureRm();
  initCaptureLm();
  initCaptureRt();
  initCaptureLb();
  initCaptureLt();
  intCaptureMainTree();
}
init();
