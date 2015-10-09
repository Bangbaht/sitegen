import assert from 'power-assert';
import * as ArrayUtils from '../ArrayUtils';

describe('ArrayUtils', function() {

  describe('uniqueBy', function() {
    
    it('filters dups by identity function', function() {
      assert.deepEqual(
        ArrayUtils.uniqueBy([1, 1, 2, 2, 3, 3, 3]),
        [1, 2, 3]);
    });

    it('filters dups by custom key function', function() {
      assert.deepEqual(
        ArrayUtils.uniqueBy([{k: 1}, {k: 1}, {k: 2}, {k: 2}, {k: 3}], item => item.k),
        [{k: 1}, {k: 2}, {k: 3}]);
    });
  });

});
