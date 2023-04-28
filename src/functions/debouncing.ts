export const debouncing = (func: () => void, timeout = 2000, timer: NodeJS.Timeout | undefined) => {
  clearTimeout(timer);
  timer = setTimeout(func, timeout);
};
