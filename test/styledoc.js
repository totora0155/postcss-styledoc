import postcss from 'postcss';
import test from 'ava';
import cheerio from 'cheerio';
import styledoc from '..';

const css = `
  @styledoc Button {
    @html {
      .test:
        summary;
    }
    @css {
      .test {
        color: #fff;
      }
    }
  }
`;

function transform() {
  return new Promise(resolve => {
    postcss([styledoc({themePath: './theme'})])
      .process(css)
      .then(result => resolve(result));
  });
}

test('styledoc', async t => {
  const _cache = require('../build/cache');

  await transform();
  const cache = _cache.default;
  const $ = cheerio.load(cache.html);
  t.is($('#name').text(), 'Button');
  t.is($('#html').html(), '<div class="test"></div>');
  t.is($('#summary').text(), 'summary');
  t.is(cache.css, '.test {\n        color: #fff;\n      }');
});
