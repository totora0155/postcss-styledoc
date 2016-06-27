import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import cheerio from 'cheerio';
import constant from './constant';

export default class Doc {
  constructor({style, themePath}) {
    this.style = style;
    this.themePath = themePath;
    const absPath = path.resolve(this.themePath, 'template.html');
    this.template = fs.readFileSync(absPath, 'utf-8');
    this.sections = [];
  }

  append(section) {
    this.sections.push(section);
  }

  render() {
    const absPath = path.resolve(this.themePath, 'style.css');
    let style = fs.readFileSync(absPath);
    if (this.style) {
      style += `\n${this.style}`;
    }
    return _.template(this.template)({
      themeStyle: `<style>${style}</style>`,
      sections: this.sections
    });
  }
};
