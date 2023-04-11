// toastModal의 top,left 값을 리턴하는 함수
export const getToastModalPosition = () => {
  const appEl = document.querySelector('.App');
  const wrapper = document.querySelector('.wrapper');
  if (appEl) {
    const widthOfAppEl = appEl.clientWidth;
    const marginLeft = (window.innerWidth - widthOfAppEl) / 2;
    //39 : toastModal.height 23: wrapper와의 간격 , 20 :  toast modal의 padding
    /* 만약 .next-btn 위에 있어야 한다면,
      const nextBtnEl= document.querySelector("next-btn") as HTMLElement|null;
      setTostModalState({...
      top:`${top - nextBtnEl.offsetHeight -16}px`
    }) 
  */
    const startPoint = wrapper ? wrapper.getClientRects()[0].top : window.innerHeight - 80;
    const top = startPoint - 39 - 23 - 20;
    // widthOfModal =widthOfAppEl*0.6;
    const left = `${marginLeft}px`;
    return { top: top, left: left };
  }
};
