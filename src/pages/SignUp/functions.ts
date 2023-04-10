// toastModal의 top,left 값을 리턴하는 함수
export const getToastModalPosition = () => {
  const appEl = document.querySelector('.App');
  const wrapper = document.querySelector('.wrapper');
  if (appEl && wrapper) {
    const widthOfAppEl = appEl.clientWidth;
    const marginLeft = (window.innerWidth - widthOfAppEl) / 2;
    //39 : toastModal.height
    /* 만약 .next-btn 위에 있어야 한다면,
      const nextBtnEl= document.querySelector("next-btn") as HTMLElement|null;
      setTostModalState({...
      top:`${top - nextBtnEl.offsetHeight -16}px`
    }) 
  */
    const top = wrapper.getClientRects()[0].top - 39 - 23;
    // widthOfModal =widthOfAppEl*0.6;
    const left = `${marginLeft + widthOfAppEl * 0.2 - 15}px`;
    return { top: top, left: left };
  }
};
