import postcss from 'postcss';
import _ from 'lodash';
import {jsdom} from 'jsdom';
import cache from './cache';
import Doc from './doc';
import DocSection from './doc-section';
import DocNode from './doc-node';

const AT_RULE = 'styledoc';
const HTML_AT_RULE = 'html';
const CSS_AT_RULE = 'css';

const defaultOpts = {
  themePath: null
};

export default postcss.plugin('postcss-styledoc', opts => {
  let doc = null;
  opts = Object.assign({}, defaultOpts, opts);

  return (root, result) => {
    if (opts.themePath === null) {
      result.warn(`\`themePath\` option is required`, {node: root});
    }

    root.walkAtRules(AT_RULE, styledoc => {
      if (typeof document === 'undefined') {
        global.document = jsdom('<body></body>');
      }

      if (doc === null) {
        doc = new Doc(styledoc, opts);
      }

      styledoc.walkAtRules(HTML_AT_RULE, html => {
        const decls = _.filter(html.nodes, n => n.type === 'decl');

        if (!decls.length) {
          return;
        }

        const section = new DocSection(styledoc.params);
        doc.append(section);
        html.walkDecls(decl => {
          const node = new DocNode(decl);
          section.append(node);
        });
      });

      styledoc.walkAtRules(CSS_AT_RULE, css => {
        if (!css.nodes) {
          return;
        }
        cache.css += css.nodes.toString();
      });

      styledoc.remove();
    });
    cache.html = doc.render();
  };
});
