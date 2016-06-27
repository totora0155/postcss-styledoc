import postcss from 'postcss';
import _ from 'lodash';
import {jsdom} from 'jsdom';
import cache from './cache';
import Doc from './doc';
import DocSection from './doc-section';
import DocNode from './doc-node';

const AT_RULE = 'styledoc';

export default postcss.plugin('postcss-styledoc', (opts) => {
  let doc = null;
  return (css, result) => {
    css.walkAtRules(AT_RULE, rule => {
      if (typeof document === 'undefined') {
        global.document = jsdom('<body></body>');
      }

      if (doc === null) {
        doc = new Doc(opts);
      }

      const section = new DocSection(rule);
      doc.append(section);

      rule.walkDecls(decl => {
        const node = new DocNode(decl);
        section.append(node);
      });

      rule.remove();
    });
    cache.html = doc.render();
  };
});
