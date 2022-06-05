function isMobile() {
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  return mediaQuery.matches;
}

function isDesktop() {
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  return mediaQuery.matches;
}

function debounce(callback, timeout = 500) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callback.apply(this, args); }, timeout);
  };
}

function throttle(callback, timeout = 500) {
  let isThrottling = false;

  return function () {
    if (isThrottling) return;

    isThrottling = true;
    setTimeout(() => {
      callback();
      isThrottling = false;
    }, timeout);
  };
}

const utils = {
  isMobile,
  isDesktop,
  debounce,
  throttle,
};

export default utils;
