import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import through from 'through2';
import glob from 'glob';
import cheerio from 'cheerio';
import es from 'event-stream';
import cache from './cache';

const defaultOpts = {
  dependencies: []
};

export default function write(opts, cbForDoc) {
  opts = Object.assign({}, defaultOpts, opts);

  return through.obj(function(file, enc, cb) {
    const clonedFile = file.clone();
    clonedFile.path = clonedFile.path.replace(/\..+/, '.html');

    const $ = cheerio.load(cache.html);
    const lastHistory = file.history[file.history.length - 1];

    let style = _.reduce(opts.dependencies, (css, pattern) => {
      const filePaths = glob.sync(path.resolve(pattern));
      if (filePaths.length) {
        _.forEach(filePaths, filePath => {
          css += `\n${fs.readFileSync(filePath, 'utf-8')}`
        });
      }
      return css;
    }, '');
    style += fs.readFileSync(lastHistory, 'utf-8');
    debugger;
    $('head').append(`<style>${style}</style>`);

    clonedFile.contents = new Buffer($.html());
    cb(null, file);
    cbForDoc(es.readArray([clonedFile]));
  });
};
