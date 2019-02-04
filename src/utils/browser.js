const global = window;
const uA = global.navigator.userAgent;
export const checkIsPc = () => {
  const browserIds = ['Mac', 'Windows'];
  let isPc = false;
  let pcIdV = null;
  browserIds.forEach((pcId) => {
  	const pcIdReg = new RegExp(pcId, 'i');
  	if (pcIdReg.test(uA)) {
  		isPc = true;
  		pcIdV = pcId
		  return false
	  }
  });
  if (isPc) {
    return {
      pcIdV,
      isPc
    }
  }
  return {
    isPc: false
  }
};
