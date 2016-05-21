/**
 * @copyright 2016-present, Sitegen team
 */

import fs from 'fs';
import path from 'path';
import commander from 'commander';

let cwd = process.cwd();

export function parse(configure = p => p, args = process.argv) {
  args = configure(commander)
    .parse(args);

  let [entry = './'] = args.args;

  if (!fs.existsSync(entry)) {
    error('site entry does not exist');
  }

  if (fs.statSync(entry)) {
    entry = path.join(cwd, entry, 'sitegen.config.js');
  }

  if (!fs.existsSync(entry)) {
    error('site entry does not exist');
  }

  if (args.output) {
    args.output = path.join(cwd, output);
  } else {
    args.output = path.join(path.dirname(entry), 'output');
  }

  args.args = [entry];

  return args;
}

export function error(error, code = 1) {
  let message = error.details || error.stack || error;
  console.error('Error:', message); // eslint-disable-line no-console
  if (code != null) {
    process.exit(code);
  }
}

export function log(message) {
  console.log(message); // eslint-disable-line no-console
}
