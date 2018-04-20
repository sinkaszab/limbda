const test = require('tape');
const { reduce } = require('./../index.js');

test('Reduce to a value with initial value set.', function (t) {
  t.plan(1);
  t.equal(reduce((a, v) => a + v, [1, 2, 3, 4, 5], 0), 15);
  t.end();
});
