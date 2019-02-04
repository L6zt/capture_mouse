import './css/main.scss'
import CaptureMouse from './main';
import {getElement, sgElemCss} from './utils/dom';
const initSingleItem = () => {
  const elem = getElement('.jc-capture-rb');
  const controlView = getElement('.mouse-handle-view');
  const captureA = new CaptureMouse(elem);
  let left = 0;
  let top = 0;
  console.log(sgElemCss(controlView, 'left'), sgElemCss(controlView, 'right'));
  captureA.captureSateChange(function (playLoad) {
	  const {dx, dy} = playLoad;
	  let curLeft = left + dx;
	  let curTop = top + dy;
	  sgElemCss(controlView, {
	  	left: `${curLeft}px`,
		  top: `${curTop}px`
	  });
  });
}
const init = () => {
  initSingleItem();
};
init();
