import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import postcss from 'postcss';
import cheerio from 'cheerio';
import constant from './constant';

export default class Doc {
  constructor(atRule, {themePath}) {
    this.atRule = atRule;
    this.themePath = themePath;
    this.sections = [];
  }

  append(section) {
    this.sections.push(section);
  }

  render() {
    const template = (() => {
      const templatePath = path.resolve(this.themePath, 'template.html');
      return fs.readFileSync(templatePath);
    })();

    const style = (() => {
      const stylePath = path.resolve(this.themePath, 'style.css');
      return fs.readFileSync(stylePath);
    })();

    return _.template(template)({
      themeStyle: `<style>${style}</style>`,
      sections: this.sections
    });
  }
};
