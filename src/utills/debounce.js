export function debounce(callback, limit = 700) {
  let wating;

  return function (...args) {
    clearTimeout(wating);
    wating = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
}
