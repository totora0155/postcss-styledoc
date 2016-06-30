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
    const $ = cheerio.load(cache.html);
    const styles = [clonedFile.contents.toString()];

    if (opts.dependencies) {
      styles.unshift(_.reduce(opts.dependencies, (css, pattern) => {
        const filePaths = glob.sync(path.resolve(pattern));
        if (filePaths.length) {
          _.forEach(filePaths, filePath => {
            css += `\n${fs.readFileSync(filePath, 'utf-8')}`
          });
        }
        return css;
      }, ''));
    } else if (cache.css) {
      styles.push(cache.css);
    }
    $('head').append(`<style>${styles.join('\n')}</style>`);

    clonedFile.contents = new Buffer($.html());
    clonedFile.path = clonedFile.path.replace(/[^.]+$/, 'html');
    cb(null, file);
    cbForDoc(es.readArray([clonedFile]));
  });
};
