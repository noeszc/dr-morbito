const curry = require('lodash.curry');
const query = (a) => document.querySelector(`[data-name="${a}"]`);

const setAttribute = curry((el, obj, name) => el.setAttribute(name, obj[name]));
const set = curry((el, obj, name) => (el[name] = obj[name]));
const not = curry((f, a) => !f(a));

const isCamelCase = (a) => a != a.toLowerCase();

export function isElementPreset(dataName) {
  if (!dataName) return;

  return query(dataName);
}

export function matches(elem, selector) {
 // Vendor-specific implementations of `Element.prototype.matches()`.
 const proto = window.Element.prototype;
 const nativeMatches =
   proto.matches ||
   proto.mozMatchesSelector ||
   proto.msMatchesSelector ||
   proto.oMatchesSelector ||
   proto.webkitMatchesSelector;

 if (!elem || elem.nodeType !== 1) {
   return false;
 }

 const parentElem = elem.parentNode;

 // use native 'matches'
 if (nativeMatches) {
   return nativeMatches.call(elem, selector);
 }

 // native support for `matches` is missing and a fallback is required
 const nodes = parentElem.querySelectorAll(selector);
 const len = nodes.length;

 for (let i = 0; i < len; i++) {
   if (nodes[i] === elem) {
     return true;
   }
 }

 return false;
}

export function closest(element, selector, context = document) {
  element = { parentNode: element };

  while ((element = element.parentNode) && element !== context) {
    if (matches(element, selector)) {
      return element;
    }
  }
}

export const ease = (a, b, c) => 
   a + (b - a) * c;


export default function createElement(name, options = {}) {
  const {
    dataName,
    notAppend,
    parent = document.body,
    uniq = true,
    ...restOptions
  } = options;

  const elFound = isElementPreset(dataName);
  if (uniq && elFound) return elFound;

  const el = document.createElement(name);

  if (dataName) el.dataset.name = dataName;

  Object.keys(restOptions).filter(isCamelCase).map(set(el, options));

  Object.keys(restOptions)
    .filter(not(isCamelCase))
    .map(setAttribute(el, options));

  if (!notAppend) parent.appendChild(el);

  return el;
}
