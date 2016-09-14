import browser from 'detect-browser';

export function isTouchDevice() {
  return (('ontouchstart' in window)
  || (navigator.MaxTouchPoints > 0)
  || (navigator.msMaxTouchPoints > 0));
}

export function isAppleDevice() {
  if (browser.name === 'ios' || browser.name === 'safari' || browser.name === undefined) {
    return true;
  } else {
    return false;
  }
}
