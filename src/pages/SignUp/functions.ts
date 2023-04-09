// toastModal의 top,left 값을 리턴하는 함수
export const getToastModalPosition = (toastModalPositionTargetEl: HTMLElement) => {
  const widthOfToastModal = window.innerWidth >= 560 ? 560 * 0.6 : window.innerWidth * 0.6;
  const domRectOfTarget = toastModalPositionTargetEl.getClientRects()[0];
  const top = `${domRectOfTarget.top - 39 - 16}px`;
  const left = `${(window.innerWidth - widthOfToastModal) / 2 - 10}px`;
  return {
    top: top,
    left: left,
  };
};
