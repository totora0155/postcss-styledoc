import fs from 'fs';
import path from 'path';
import _ from 'lodash';

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
      return fs.readFileSync(templatePath, 'utf-8');
    })();

    const style = (() => {
      const stylePath = path.resolve(this.themePath, 'style.css');
      return fs.readFileSync(stylePath, 'utf-8');
    })();

    return _.template(template)({
      themeStyle: `<style>${style}</style>`,
      sections: this.sections
    });
  }
}
