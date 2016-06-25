import _ from 'lodash';
import cheerio from 'cheerio';

export default class DecSection {
  constructor(rule) {
    this.name = rule.params;
    this.nodes = [];
  }

  get html() {
    const htmls = _.map(this.nodes, node => node.html);
    return htmls.join('\n');
  }

  append(node) {
    this.nodes.push(node);
  }
};
