import browser from 'detect-browser';
import { hasProfileCompleted } from '../modules/App/AppReducer';

export function isTouchDevice() {
  return (('ontouchstart' in window)
  || (navigator.MaxTouchPoints > 0)
  || (navigator.msMaxTouchPoints > 0));
}

export function problemWithFilters() {
  return ((browser.name === 'ios') || (browser.name === 'safari') || (browser.name === 'edge') || (browser.name === 'ie') || (browser.name === undefined));
}

export function getFirstUserPageLink(user) {
  return hasProfileCompleted(user) ? `/profile/${ user.cuid }` : '/users/setup'
}
