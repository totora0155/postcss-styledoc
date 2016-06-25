import through from 'through2';
import cache from './cache';

export default function init() {
  return through.obj(function(file, enc, cb) {
    cache._current = cache[file.history[0]] = {file};
    cb(null, file);
  });
};
