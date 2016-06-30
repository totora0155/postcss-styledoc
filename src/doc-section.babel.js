import _ from 'lodash';
import cheerio from 'cheerio';

export default class DecSection {
  constructor(name) {
    this.name = name;
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
