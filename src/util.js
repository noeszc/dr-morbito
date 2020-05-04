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

export function match(el, selector) {
  const proto = typeof Element !== undefined ? Element.prototype : {};
  const vendor =
    proto.matches ||
    proto.matchesSelector ||
    proto.webkitMatchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector;
  
  if (!el || el.nodeType !== 1) return false;
  if(vendor) return vendor.call(el, selector);
  return false
}

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
