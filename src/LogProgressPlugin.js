export default class LogProgressPlugin {

  constructor(name = 'webpack') {
    this.name = name;
    this._notifyOnCompile = true;
  }

  apply(compiler) {
    compiler.plugin('compile', this._onCompile.bind(this));
    compiler.plugin('invalid', this._onInvalid.bind(this));
    compiler.plugin('done', this._onDone.bind(this));
  }

  _log(message) {
    console.log(`${this.name}: ${message}`); // eslint-disable-line no-console
  }

  _onDone(stats) {
    let time = stats.endTime - stats.startTime;
    if (stats.compilation.errors.length > 0) {
      this._log('compilation failed');
      stats.compilation.errors.forEach(error => this._log(error.message));
    } else {
      this._log('compilation finished (' + time + 'ms)');
    }
  }

  _onCompile() {
    if (this._notifyOnCompile) {
      this._notifyOnCompile = false;
      this._log('compilation started');
    }
  }

  _onInvalid() {
    this._log('bundled invalidated, recompiling...');
  }
}
