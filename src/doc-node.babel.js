import _ from 'lodash';
import {prettyPrint} from 'html';
import createElementBySelector from 'create-element-by-selector.js';

export default class DocNode {
  constructor(decl) {
    this.prop = decl.prop;
    this.summary = decl.value;
    this.createElement = _.memoize(createElement);
  }

  get html() {
    const html = this.createElement(this.prop).outerHTML;
    return prettyPrint(html);
  }

  get code() {
    const html = this.createElement(this.prop).outerHTML;
    return highlight(_.escape(prettyPrint(html)));
  }
}

function createElement(prop) {
  const selectors = prop.match(/([>+^]?)([^>+^]+)/g);
  const root = createElementBySelector('#__root');
  _.reduce(selectors, (elem, selector) => {
    if (elem === null) {
      elem = createElementBySelector(selector);
      resolveA(elem);
      resolveText(elem);
      root.appendChild(elem);
      return elem;
    }

    switch (selector[0]) {
      case '>': {
        const child = createElementBySelector(selector.slice(1));
        resolveA(child);
        resolveText(child);
        elem.appendChild(child);
        return child;
      }
      case '+': {
        const next = createElementBySelector(selector.slice(1));
        resolveA(next);
        resolveText(next);
        elem.parentElement.appendChild(next);
        return next;
      }
      case '^': {
        const len = selector.match(/^\^+/)[0].length;
        const next = createElementBySelector(selector.slice(len));
        resolveA(next);
        resolveText(next);
        let parent = elem;
        _.times(len, () => {
          parent = elem.parentElement;
        });
        parent.parentElement.appendChild(next);
        return next;
      }
      default: {
        return;
      }
    }
  }, null);

  return root.children[0];
}

function resolveA(elem) {
  if (elem.tagName === 'A') {
    elem.setAttribute('href', '#');
  }
}

function resolveText(elem) {
  const innerText = elem.getAttribute('innerText');
  if (innerText) {
    const text = document.createTextNode(innerText.match(/"?([^"]*)"?/)[1]);
    elem.appendChild(text);
    elem.removeAttribute('innerText');
  }
}

function highlight(str) {
  let result = str;
  result = replaceAttribute(result);
  result = replaceTag(result);
  return result;
}

function replaceTag(str) {
  return str.replace(/&lt;([^\s]+)([\b &])/g, (all, tagname, ends) => {
    return `&lt;<span class="styledoc-code__tag">${tagname}</span>${ends}`;
  });
}

function replaceAttribute(str) {
  const re = /\b([^\s=]+)=&quot;([^&]+)&quot;/g;
  return str.replace(re, (all, attr, value) => {
    return [
      `<span class="styledoc-code__attr styledoc-code__attr--${attr}">`,
      `${attr}</span>=&quot;`,
      `<span class="styledoc-code__value styledoc-code__attr--${attr}">`,
      `${value}</span>&quot;`
    ].join('');
  });
}
