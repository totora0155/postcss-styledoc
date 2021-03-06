# postcss-styledoc

[![npm version](https://badge.fury.io/js/postcss-styledoc.svg)](https://badge.fury.io/js/postcss-styledoc)
[![Build Status](https://travis-ci.org/totora0155/postcss-styledoc.svg?branch=master)](https://travis-ci.org/totora0155/postcss-styledoc)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

<p><img width="20" src="https://camo.githubusercontent.com/2ec260a9d4d3dcc109be800af0b29a8471ad5967/687474703a2f2f706f73746373732e6769746875622e696f2f706f73746373732f6c6f676f2e737667"> <a href="https://github.com/postcss/postcss">PostCSS</a> plugin for the style document

---

Change repo to [https://github.com/nju33/postcss-styledoc](https://github.com/nju33/postcss-styledoc)

---

## Install

```
npm i -D postcss-styledoc
```

## Usage with gulp

First, run to `styledoc.init`.  
Second, use 'styledoc' plugin with other postcss plugins.  
Finally, run to `styledoc.write` after `gulp.dest`.

```js
const fs = require('fs');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const styledoc = require('postcss-styledoc');
const extend = require('postcss-extend');
const namespace = require('postcss-namespace');
const preref = require('postcss-preref');

gulp.task('css', () => {
  gulp.src('src/**/*.css')
    .pipe(plumber())
    .pipe(styledoc.init())
    .pipe(postcss([
      extend,
      namespace({token: '__'}),
      preref,
      styledoc({
        themePath: styledoc.themes.MINIMALIST
      })
    ]))
    .pipe(gulp.dest('.'))
    .pipe(styledoc.write(stream => {
      stream
        .pipe(require('gulp-debug')())
        .pipe(gulp.dest('styledoc'));
    }));
});

gulp.task('default', ['css'], () => {
  gulp.watch(['src/**/*.css'], ['css']);
});

```

e.g.) `src/index.css`

```css
@styledoc Button {
  a.btn[innerText="Button"]:
    Medium button;
  a.btn--small[innerText="Button"]:
    Small button;
  a.btn--large[innerText="Button"]:
    Large button;
}

.btn {
  background: #dd3a0a;
  padding: .5em 1em;
  width: inline-block;
  color: #fff;
  border-radius: 3px;
  transition: .2s ease;
}

&:hover {
   background: #b73008;
}

.btn--small {
  @extend .btn;
  font-size: .8rem;
}

.btn--large {
  @extend .btn;
  font-size: 1.3rem;
}


@styledoc Card {
  .card__box>header.card__header+.card__body>.card__summary[innerText="text text text"]:
    Normal card;
  .card__box>header.card__header+.card__body>.card__user>img.card__img[src=//unsplash.it/300/?random]+.card__username[innerText=username]^span.card__summary[innerText="text text text"]:
    Card with user;
}

@prefix card;

.box {
  width: 15rem;
  border: 1px solid #eee;
  box-shadow: 3px 3px 5px -3px #bbb;
}

.header {
  height: 12rem;
}

.user {
  text-align: center;
  margin-bottom: 1rem;
}

.img {
  display: inline-block;
  width: 40%;
  margin: 0 auto;
  border-radius: 50%;
}

.body {
  padding: 1em;
  border-top: 1px solid #eee;
}

@prefix;

@styledoc Image {
  img.img--square[src=//unsplash.it/300/?random]:
    Square;

  img.img--circle[src=//unsplash.it/300/?random]:
    Circle;
}

.img--default {
  width: 8rem;
  height: 8rem;
}

.img--square {
  @extend .img--default;
}

.img--circle {
  @extend .img--default;
  border-radius: 50%;
}

```

Get output like this

`index.css`

```css
.btn, .btn--small, .btn--large {
  background: #dd3a0a;
  padding: .5em 1em;
  width: inline-block;
  color: #fff;
  border-radius: 3px;
  transition: .2s ease;
}

.btn:hover, .btn--small:hover, .btn--large:hover {
   background: #b73008;
}

.btn--small {
  font-size: .8rem;
}

.btn--large {
  font-size: 1.3rem;
}

.card__box {
  width: 15rem;
  border: 1px solid #eee;
  box-shadow: 3px 3px 5px -3px #bbb;
}

.card__header {
  height: 12rem;
}

.card__user {
  text-align: center;
  margin-bottom: 1rem;
}

.card__img {
  display: inline-block;
  width: 40%;
  margin: 0 auto;
  border-radius: 50%;
}

.card__body {
  padding: 1em;
  border-top: 1px solid #eee;
}

.img--default, .img--square, .img--circle {
  width: 8rem;
  height: 8rem;
}

.img--circle {
  border-radius: 50%;
}
```

`index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Styledoc</title>
  <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet">
  <style>
  @charset "utf-8";

  :root {
  font-size: 14px;
  }

  body {
  color: #333;
  margin: 0;
  background: #e2e2e2;
  }

  ul {
  list-style: none;
  }

  a {
  color: inherit;
  text-decoration: none;
  }

  pre {
  margin: 0;
  }

  .styledoc-theme-minimalist__box {
  display: flex;
  min-height: 100vh;
  width: 77.14286rem;
  margin: 0 auto;
  }

  .styledoc-theme-minimalist__sidebar {
  flex: 0 0 17.14286rem;
  }

  .styledoc-theme-minimalist__list {
  position: fixed;
  width: 17.14286rem;
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0;
  line-height: 2;
  }

  .styledoc-theme-minimalist__main {
  flex-grow: 1;
  }

  .styledoc-theme-minimalist__section {
  margin-bottom: 2.5rem;
  }

  .styledoc-theme-minimalist__headline {
  font-size: 2.3rem;
  margin-bottom: 1.8rem;
  }

  .styledoc-theme-minimalist__body {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 2rem);
  margin-left: -1rem;
  }

  .styledoc-theme-minimalist__node {
  overflow: hidden;
  flex: 0 0 50%;
  box-sizing: border-box;
  padding: 1rem;
  }

  .styledoc-theme-minimalist__view {
  padding: 1rem;
  background: #fff;
  }

  .styledoc-theme-minimalist__editor {
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
  background: #333;
  color: #f8f8f8;
  font-family: 'Source Code Pro';
  font-size: .83rem;
  overflow: auto;
  }

  .styledoc-theme-minimalist__editor:hover .styledoc-theme-minimalist__clippy {
  opacity: 1;
  }

  .styledoc-theme-minimalist__clippy {
  position: absolute;
  right: 1rem;
  top: 1rem;
  opacity: 0;
  cursor: pointer;
  transition: .2s ease;
  }

  .styledoc-theme-minimalist__clippy:active path {
  transition: .2s ease;
  fill: #dd3a0a;
  }

  .styledoc-theme-minimalist__clippy path {
  transition: .2s ease 1s;
  fill: #f8f8f8;
  }

  .styledoc-theme-minimalist__summary {
  padding: 1rem;
  background: #ccc;
  }

  .styledoc-theme-minimalist__footer {
  text-align: center;
  font-size: .85rem;
  }

  .styledoc-theme-minimalist__powered-by {
  padding: .5em;
  background: linear-gradient(to right, #ccc 40%, transparent 40%, transparent 60%, #ccc 60%) repeat-x;
  background-size: 33.3% 1px;
  }

  .styledoc-theme-minimalist__powered-by-link {
  color: #dd3a0a;
  }

  .styledoc-code__attr {
  color: #dd3a0a;
  }

  .styledoc-code__value {
  color: #f3d37d;
  }

  .card__box {
  margin: 0 auto;
  }

  .card__header {
  background: url(//unsplash.it/600/?random);
  background-size: cover;
  }
  </style>
  <style>
  .btn, .btn--small, .btn--large {
  background: #dd3a0a;
  padding: .5em 1em;
  width: inline-block;
  color: #fff;
  border-radius: 3px;
  transition: .2s ease;
  }

  .btn:hover, .btn--small:hover, .btn--large:hover {
   background: #b73008;
  }

  .btn--small {
  font-size: .8rem;
  }

  .btn--large {
  font-size: 1.3rem;
  }

  .card__box {
  width: 15rem;
  border: 1px solid #eee;
  box-shadow: 3px 3px 5px -3px #bbb;
  }

  .card__header {
  height: 12rem;
  }

  .card__user {
  text-align: center;
  margin-bottom: 1rem;
  }

  .card__img {
  display: inline-block;
  width: 40%;
  margin: 0 auto;
  border-radius: 50%;
  }

  .card__body {
  padding: 1em;
  border-top: 1px solid #eee;
  }

  .img--default, .img--square, .img--circle {
  width: 8rem;
  height: 8rem;
  }

  .img--circle {
  border-radius: 50%;
  }
  </style>
</head>
<body>
  <div class="styledoc-theme-minimalist__box">
    <nav class="styledoc-theme-minimalist__sidebar">
      <ul class="styledoc-theme-minimalist__list">
        <li class="styledoc-theme-minimalist__item">
          <a class="styledoc-theme-minimalist__itemlink" href="#Button">Button</a>
        </li>
        <li class="styledoc-theme-minimalist__item">
          <a class="styledoc-theme-minimalist__itemlink" href="#Card">Card</a>
        </li>
        <li class="styledoc-theme-minimalist__item">
          <a class="styledoc-theme-minimalist__itemlink" href="#Image">Image</a>
        </li>
      </ul>
    </nav>
    <main class="styledoc-theme-minimalist__main">
      <section class="styledoc-theme-minimalist__section" id="Button">
        <header class="styledoc-theme-minimalist__header">
          <h1 class="styledoc-theme-minimalist__headline">Button</h1>
        </header>
        <div class="styledoc-theme-minimalist__body">
          <div class="styledoc-theme-minimalist__node">
            <div class="styledoc-theme-minimalist__view">
              <a class="btn" href="#">Button</a>
            </div>
            <div class="styledoc-theme-minimalist__editor">
              <pre class="styledoc-theme-minimalist__code">&lt;<span class="styledoc-code__tag">a</span> <span class=
              "styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--class">btn</span>&quot; <span class=
              "styledoc-code__attr styledoc-code__attr--href">href</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--href">#</span>&quot;&gt;Button&lt;<span class=
              "styledoc-code__tag">/a</span>&gt;</pre><svg class="styledoc-theme-minimalist__clippy" height="16px" version="1.1" viewbox=
              "0 0 14 16" width="14px" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd" id="Octicons" stroke="none" stroke-width="1">
                <g fill="#000000" id="clippy">
                  <path d=
                  "M2,13 L6,13 L6,14 L2,14 L2,13 L2,13 Z M7,7 L2,7 L2,8 L7,8 L7,7 L7,7 Z M9,10 L9,8 L6,11 L9,14 L9,12 L14,12 L14,10 L9,10 L9,10 Z M4.5,9 L2,9 L2,10 L4.5,10 L4.5,9 L4.5,9 Z M2,12 L4.5,12 L4.5,11 L2,11 L2,12 L2,12 Z M11,13 L12,13 L12,15 C11.98,15.28 11.89,15.52 11.7,15.7 C11.51,15.88 11.28,15.98 11,16 L1,16 C0.45,16 0,15.55 0,15 L0,4 C0,3.45 0.45,3 1,3 L4,3 C4,1.89 4.89,1 6,1 C7.11,1 8,1.89 8,3 L11,3 C11.55,3 12,3.45 12,4 L12,9 L11,9 L11,6 L1,6 L1,15 L11,15 L11,13 L11,13 Z M2,5 L10,5 C10,4.45 9.55,4 9,4 L8,4 C7.45,4 7,3.55 7,3 C7,2.45 6.55,2 6,2 C5.45,2 5,2.45 5,3 C5,3.55 4.55,4 4,4 L3,4 C2.45,4 2,4.45 2,5 L2,5 Z"
                  id="Shape"></path>
                </g>
              </g></svg>
            </div>
            <div class="styledoc-theme-minimalist__summary">
              Medium button
            </div>
          </div>
          <div class="styledoc-theme-minimalist__node">
            <div class="styledoc-theme-minimalist__view">
              <a class="btn--small" href="#">Button</a>
            </div>
            <div class="styledoc-theme-minimalist__editor">
              <pre class="styledoc-theme-minimalist__code">&lt;<span class="styledoc-code__tag">a</span> <span class=
              "styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--class">btn--small</span>&quot; <span class=
              "styledoc-code__attr styledoc-code__attr--href">href</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--href">#</span>&quot;&gt;Button&lt;<span class=
              "styledoc-code__tag">/a</span>&gt;</pre><svg class="styledoc-theme-minimalist__clippy" height="16px" version="1.1" viewbox=
              "0 0 14 16" width="14px" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd" id="Octicons" stroke="none" stroke-width="1">
                <g fill="#000000" id="clippy">
                  <path d=
                  "M2,13 L6,13 L6,14 L2,14 L2,13 L2,13 Z M7,7 L2,7 L2,8 L7,8 L7,7 L7,7 Z M9,10 L9,8 L6,11 L9,14 L9,12 L14,12 L14,10 L9,10 L9,10 Z M4.5,9 L2,9 L2,10 L4.5,10 L4.5,9 L4.5,9 Z M2,12 L4.5,12 L4.5,11 L2,11 L2,12 L2,12 Z M11,13 L12,13 L12,15 C11.98,15.28 11.89,15.52 11.7,15.7 C11.51,15.88 11.28,15.98 11,16 L1,16 C0.45,16 0,15.55 0,15 L0,4 C0,3.45 0.45,3 1,3 L4,3 C4,1.89 4.89,1 6,1 C7.11,1 8,1.89 8,3 L11,3 C11.55,3 12,3.45 12,4 L12,9 L11,9 L11,6 L1,6 L1,15 L11,15 L11,13 L11,13 Z M2,5 L10,5 C10,4.45 9.55,4 9,4 L8,4 C7.45,4 7,3.55 7,3 C7,2.45 6.55,2 6,2 C5.45,2 5,2.45 5,3 C5,3.55 4.55,4 4,4 L3,4 C2.45,4 2,4.45 2,5 L2,5 Z"
                  id="Shape"></path>
                </g>
              </g></svg>
            </div>
            <div class="styledoc-theme-minimalist__summary">
              Small button
            </div>
          </div>
          <div class="styledoc-theme-minimalist__node">
            <div class="styledoc-theme-minimalist__view">
              <a class="btn--large" href="#">Button</a>
            </div>
            <div class="styledoc-theme-minimalist__editor">
              <pre class="styledoc-theme-minimalist__code">&lt;<span class="styledoc-code__tag">a</span> <span class=
              "styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--class">btn--large</span>&quot; <span class=
              "styledoc-code__attr styledoc-code__attr--href">href</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--href">#</span>&quot;&gt;Button&lt;<span class=
              "styledoc-code__tag">/a</span>&gt;</pre><svg class="styledoc-theme-minimalist__clippy" height="16px" version="1.1" viewbox=
              "0 0 14 16" width="14px" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd" id="Octicons" stroke="none" stroke-width="1">
                <g fill="#000000" id="clippy">
                  <path d=
                  "M2,13 L6,13 L6,14 L2,14 L2,13 L2,13 Z M7,7 L2,7 L2,8 L7,8 L7,7 L7,7 Z M9,10 L9,8 L6,11 L9,14 L9,12 L14,12 L14,10 L9,10 L9,10 Z M4.5,9 L2,9 L2,10 L4.5,10 L4.5,9 L4.5,9 Z M2,12 L4.5,12 L4.5,11 L2,11 L2,12 L2,12 Z M11,13 L12,13 L12,15 C11.98,15.28 11.89,15.52 11.7,15.7 C11.51,15.88 11.28,15.98 11,16 L1,16 C0.45,16 0,15.55 0,15 L0,4 C0,3.45 0.45,3 1,3 L4,3 C4,1.89 4.89,1 6,1 C7.11,1 8,1.89 8,3 L11,3 C11.55,3 12,3.45 12,4 L12,9 L11,9 L11,6 L1,6 L1,15 L11,15 L11,13 L11,13 Z M2,5 L10,5 C10,4.45 9.55,4 9,4 L8,4 C7.45,4 7,3.55 7,3 C7,2.45 6.55,2 6,2 C5.45,2 5,2.45 5,3 C5,3.55 4.55,4 4,4 L3,4 C2.45,4 2,4.45 2,5 L2,5 Z"
                  id="Shape"></path>
                </g>
              </g></svg>
            </div>
            <div class="styledoc-theme-minimalist__summary">
              Large button
            </div>
          </div>
        </div>
      </section>
      <section class="styledoc-theme-minimalist__section" id="Card">
        <header class="styledoc-theme-minimalist__header">
          <h1 class="styledoc-theme-minimalist__headline">Card</h1>
        </header>
        <div class="styledoc-theme-minimalist__body">
          <div class="styledoc-theme-minimalist__node">
            <div class="styledoc-theme-minimalist__view">
              <div class="card__box">
                <header class="card__header"></header>
                <div class="card__body">
                  <div class="card__summary">
                    text text text
                  </div>
                </div>
              </div>
            </div>
            <div class="styledoc-theme-minimalist__editor">
              <pre class="styledoc-theme-minimalist__code">&lt;<span class="styledoc-code__tag">div</span> <span class=
              "styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--class">card__box</span>&quot;&gt;
    &lt;<span class="styledoc-code__tag">header</span> <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__header</span>&quot;&gt;&lt;<span class="styledoc-code__tag">/header</span>&gt;
    &lt;<span class="styledoc-code__tag">div</span> <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__body</span>&quot;&gt;
        &lt;<span class="styledoc-code__tag">div</span> <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__summary</span>&quot;&gt;text text text&lt;<span class=
"styledoc-code__tag">/div</span>&gt;
    &lt;<span class="styledoc-code__tag">/div</span>&gt;
&lt;<span class="styledoc-code__tag">/div</span>&gt;</pre><svg class="styledoc-theme-minimalist__clippy" height="16px" version="1.1"
              viewbox="0 0 14 16" width="14px" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd" id="Octicons" stroke="none" stroke-width="1">
                <g fill="#000000" id="clippy">
                  <path d=
                  "M2,13 L6,13 L6,14 L2,14 L2,13 L2,13 Z M7,7 L2,7 L2,8 L7,8 L7,7 L7,7 Z M9,10 L9,8 L6,11 L9,14 L9,12 L14,12 L14,10 L9,10 L9,10 Z M4.5,9 L2,9 L2,10 L4.5,10 L4.5,9 L4.5,9 Z M2,12 L4.5,12 L4.5,11 L2,11 L2,12 L2,12 Z M11,13 L12,13 L12,15 C11.98,15.28 11.89,15.52 11.7,15.7 C11.51,15.88 11.28,15.98 11,16 L1,16 C0.45,16 0,15.55 0,15 L0,4 C0,3.45 0.45,3 1,3 L4,3 C4,1.89 4.89,1 6,1 C7.11,1 8,1.89 8,3 L11,3 C11.55,3 12,3.45 12,4 L12,9 L11,9 L11,6 L1,6 L1,15 L11,15 L11,13 L11,13 Z M2,5 L10,5 C10,4.45 9.55,4 9,4 L8,4 C7.45,4 7,3.55 7,3 C7,2.45 6.55,2 6,2 C5.45,2 5,2.45 5,3 C5,3.55 4.55,4 4,4 L3,4 C2.45,4 2,4.45 2,5 L2,5 Z"
                  id="Shape"></path>
                </g>
              </g></svg>
            </div>
            <div class="styledoc-theme-minimalist__summary">
              Normal card
            </div>
          </div>
          <div class="styledoc-theme-minimalist__node">
            <div class="styledoc-theme-minimalist__view">
              <div class="card__box">
                <header class="card__header"></header>
                <div class="card__body">
                  <div class="card__user">
                    <img class="card__img" src="//unsplash.it/300/?random">
                    <div class="card__username">
                      username
                    </div>
                  </div><span class="card__summary">text text text</span>
                </div>
              </div>
            </div>
            <div class="styledoc-theme-minimalist__editor">
              <pre class="styledoc-theme-minimalist__code">&lt;<span class="styledoc-code__tag">div</span> <span class=
              "styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--class">card__box</span>&quot;&gt;
    &lt;<span class="styledoc-code__tag">header</span> <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__header</span>&quot;&gt;&lt;<span class="styledoc-code__tag">/header</span>&gt;
    &lt;<span class="styledoc-code__tag">div</span> <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__body</span>&quot;&gt;
        &lt;<span class="styledoc-code__tag">div</span> <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__user</span>&quot;&gt;
            &lt;<span class="styledoc-code__tag">img</span> <span class=
"styledoc-code__attr styledoc-code__attr--src">src</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--src">//unsplash.it/300/?random</span>&quot; <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__img</span>&quot;&gt;
            &lt;<span class="styledoc-code__tag">div</span> <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__username</span>&quot;&gt;username&lt;<span class=
"styledoc-code__tag">/div</span>&gt;
        &lt;<span class="styledoc-code__tag">/div&gt;&lt;span</span> <span class=
"styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
"styledoc-code__value styledoc-code__attr--class">card__summary</span>&quot;&gt;text text text&lt;<span class=
"styledoc-code__tag">/span</span>&gt;
    &lt;<span class="styledoc-code__tag">/div</span>&gt;
&lt;<span class="styledoc-code__tag">/div</span>&gt;</pre><svg class="styledoc-theme-minimalist__clippy" height="16px" version="1.1"
              viewbox="0 0 14 16" width="14px" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd" id="Octicons" stroke="none" stroke-width="1">
                <g fill="#000000" id="clippy">
                  <path d=
                  "M2,13 L6,13 L6,14 L2,14 L2,13 L2,13 Z M7,7 L2,7 L2,8 L7,8 L7,7 L7,7 Z M9,10 L9,8 L6,11 L9,14 L9,12 L14,12 L14,10 L9,10 L9,10 Z M4.5,9 L2,9 L2,10 L4.5,10 L4.5,9 L4.5,9 Z M2,12 L4.5,12 L4.5,11 L2,11 L2,12 L2,12 Z M11,13 L12,13 L12,15 C11.98,15.28 11.89,15.52 11.7,15.7 C11.51,15.88 11.28,15.98 11,16 L1,16 C0.45,16 0,15.55 0,15 L0,4 C0,3.45 0.45,3 1,3 L4,3 C4,1.89 4.89,1 6,1 C7.11,1 8,1.89 8,3 L11,3 C11.55,3 12,3.45 12,4 L12,9 L11,9 L11,6 L1,6 L1,15 L11,15 L11,13 L11,13 Z M2,5 L10,5 C10,4.45 9.55,4 9,4 L8,4 C7.45,4 7,3.55 7,3 C7,2.45 6.55,2 6,2 C5.45,2 5,2.45 5,3 C5,3.55 4.55,4 4,4 L3,4 C2.45,4 2,4.45 2,5 L2,5 Z"
                  id="Shape"></path>
                </g>
              </g></svg>
            </div>
            <div class="styledoc-theme-minimalist__summary">
              Card with user
            </div>
          </div>
        </div>
      </section>
      <section class="styledoc-theme-minimalist__section" id="Image">
        <header class="styledoc-theme-minimalist__header">
          <h1 class="styledoc-theme-minimalist__headline">Image</h1>
        </header>
        <div class="styledoc-theme-minimalist__body">
          <div class="styledoc-theme-minimalist__node">
            <div class="styledoc-theme-minimalist__view"><img class="img--square" src="//unsplash.it/300/?random"></div>
            <div class="styledoc-theme-minimalist__editor">
              <pre class="styledoc-theme-minimalist__code">&lt;<span class="styledoc-code__tag">img</span> <span class=
              "styledoc-code__attr styledoc-code__attr--src">src</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--src">//unsplash.it/300/?random</span>&quot; <span class=
              "styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--class">img--square</span>&quot;&gt;</pre><svg class=
              "styledoc-theme-minimalist__clippy" height="16px" version="1.1" viewbox="0 0 14 16" width="14px" xmlns=
              "http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd" id="Octicons" stroke="none" stroke-width="1">
                <g fill="#000000" id="clippy">
                  <path d=
                  "M2,13 L6,13 L6,14 L2,14 L2,13 L2,13 Z M7,7 L2,7 L2,8 L7,8 L7,7 L7,7 Z M9,10 L9,8 L6,11 L9,14 L9,12 L14,12 L14,10 L9,10 L9,10 Z M4.5,9 L2,9 L2,10 L4.5,10 L4.5,9 L4.5,9 Z M2,12 L4.5,12 L4.5,11 L2,11 L2,12 L2,12 Z M11,13 L12,13 L12,15 C11.98,15.28 11.89,15.52 11.7,15.7 C11.51,15.88 11.28,15.98 11,16 L1,16 C0.45,16 0,15.55 0,15 L0,4 C0,3.45 0.45,3 1,3 L4,3 C4,1.89 4.89,1 6,1 C7.11,1 8,1.89 8,3 L11,3 C11.55,3 12,3.45 12,4 L12,9 L11,9 L11,6 L1,6 L1,15 L11,15 L11,13 L11,13 Z M2,5 L10,5 C10,4.45 9.55,4 9,4 L8,4 C7.45,4 7,3.55 7,3 C7,2.45 6.55,2 6,2 C5.45,2 5,2.45 5,3 C5,3.55 4.55,4 4,4 L3,4 C2.45,4 2,4.45 2,5 L2,5 Z"
                  id="Shape"></path>
                </g>
              </g></svg>
            </div>
            <div class="styledoc-theme-minimalist__summary">
              Square
            </div>
          </div>
          <div class="styledoc-theme-minimalist__node">
            <div class="styledoc-theme-minimalist__view"><img class="img--circle" src="//unsplash.it/300/?random"></div>
            <div class="styledoc-theme-minimalist__editor">
              <pre class="styledoc-theme-minimalist__code">&lt;<span class="styledoc-code__tag">img</span> <span class=
              "styledoc-code__attr styledoc-code__attr--src">src</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--src">//unsplash.it/300/?random</span>&quot; <span class=
              "styledoc-code__attr styledoc-code__attr--class">class</span>=&quot;<span class=
              "styledoc-code__value styledoc-code__attr--class">img--circle</span>&quot;&gt;</pre><svg class=
              "styledoc-theme-minimalist__clippy" height="16px" version="1.1" viewbox="0 0 14 16" width="14px" xmlns=
              "http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd" id="Octicons" stroke="none" stroke-width="1">
                <g fill="#000000" id="clippy">
                  <path d=
                  "M2,13 L6,13 L6,14 L2,14 L2,13 L2,13 Z M7,7 L2,7 L2,8 L7,8 L7,7 L7,7 Z M9,10 L9,8 L6,11 L9,14 L9,12 L14,12 L14,10 L9,10 L9,10 Z M4.5,9 L2,9 L2,10 L4.5,10 L4.5,9 L4.5,9 Z M2,12 L4.5,12 L4.5,11 L2,11 L2,12 L2,12 Z M11,13 L12,13 L12,15 C11.98,15.28 11.89,15.52 11.7,15.7 C11.51,15.88 11.28,15.98 11,16 L1,16 C0.45,16 0,15.55 0,15 L0,4 C0,3.45 0.45,3 1,3 L4,3 C4,1.89 4.89,1 6,1 C7.11,1 8,1.89 8,3 L11,3 C11.55,3 12,3.45 12,4 L12,9 L11,9 L11,6 L1,6 L1,15 L11,15 L11,13 L11,13 Z M2,5 L10,5 C10,4.45 9.55,4 9,4 L8,4 C7.45,4 7,3.55 7,3 C7,2.45 6.55,2 6,2 C5.45,2 5,2.45 5,3 C5,3.55 4.55,4 4,4 L3,4 C2.45,4 2,4.45 2,5 L2,5 Z"
                  id="Shape"></path>
                </g>
              </g></svg>
            </div>
            <div class="styledoc-theme-minimalist__summary">
              Circle
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  <footer class="styledoc-theme-minimalist__footer">
    <span class="styledoc-theme-minimalist__powered-by">Powered by <a class="styledoc-theme-minimalist__powered-by-link" href=
    "https://github.com/totora0155/postcss-styledoc">postcss-styledoc</a></span>
  </footer>
  <script src="https://cdn.jsdelivr.net/clipboard.js/1.5.12/clipboard.min.js">
  </script>
  <script>
  new Clipboard('.styledoc-theme-minimalist__clippy', {
  text: function(trigger) {
    return trigger.parentElement.previousElementSibling.innerHTML;
  }
  });
  </script>
</body>
</html>
```

## Options

TODO

## Themes

TODO

## Change log

|version|log|
|:-:|:--|
|0.0.1|Release|
