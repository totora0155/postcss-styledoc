const styledoc = require('./build').default;

styledoc.write = require('./build/write').default;
Object.assign(styledoc, require('./build/constant').default);

module.exports = styledoc;
