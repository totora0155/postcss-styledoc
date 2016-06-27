import fs from 'fs';
import through from 'through2';
import cheerio from 'cheerio';
import es from 'event-stream';
import cache from './cache';

export default function write(cbForDoc) {
  return through.obj(function(file, enc, cb) {
    const clonedFile = file.clone();
    clonedFile.path = clonedFile.path.replace(/\..+/, '.html');

    const $ = cheerio.load(cache.html);
    const lastHistory = file.history[file.history.length - 1];

    const style = fs.readFileSync(lastHistory, 'utf-8');
    $('head').append(`<style>${style}</style>`);
    clonedFile.contents = new Buffer($.html());

    cb(null, file);
    cbForDoc(es.readArray([clonedFile]));
  });
};
