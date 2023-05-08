export const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const removeVh = () => {
  document.documentElement.style.removeProperty('--vh');
};
