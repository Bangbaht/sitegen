#!/usr/bin/env node
/**
 * @copyright 2016-present, Sitegen team
 */

import express from 'express';
import makeDebug from 'debug';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse} from './utils';
import {createCompiler} from '../compiler';

let debug = makeDebug('sitegen:cmd:serve');

let args = parse();
let [entry] = args.args;

let compiler = createCompiler({
  entry,
  env: 'development',
  publicPath: args.publicPath,
});

let compileDevMiddleware = WebpackDevMiddleware(compiler, {
  quiet: false,
  stats: {
    chunks: false,
    modules: false,
    colors: true,
  },
});

let compileHotMiddleware = WebpackHotMiddleware(compiler, {
  log() { },
});

function render(req, res, next) {
  compiler.promiseBundle.then(
    mod => res.send(renderToStaticMarkup(<mod.Site bundle={{js: '/bundle.js'}} />)),
    err => next(err)
  );
}

express()
  .use(compileDevMiddleware)
  .use(compileHotMiddleware)
  .use(render)
  .listen(3000, () => debug('started listening on port 3000'));
