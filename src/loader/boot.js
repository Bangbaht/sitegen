import {renderRoute, validate, forEach} from '../route';
import evalAsModule from 'eval-as-module';

const BOOT_MODULE = require.resolve('../boot');

module.exports = function(source) {
  this.cacheable();

  let compiler = this._compiler;
  let cb = this.async();
  let fs = compiler.inputFileSystem;

  let {route} = evalAsModule(source, this.resource).exports;
  route = validate(route, {basedir: this.context});

  // traverse route tree and set watchers on collections
  // TODO: make sure we stay consistent with what renderRoute(..) does
  forEach(route, route => {
    if (route.collection) {
      this.addContextDependency(route.collection.page.directory);
    }
  });

  renderRoute(route, {
    fs,
    split: compiler.options.env === 'content' ? false : undefined
  }).then(
    route => cb(null, `
      var makeDebug = require('debug');
      var React = require('react');
      var boot = require("${BOOT_MODULE}").boot;

      var debug = makeDebug('sitegen:runtime:route');

      exports.route = ${route};

      if (typeof window !== 'undefined') {
        boot(${route});
      }
    `),
    err => cb(err)
  );
}
