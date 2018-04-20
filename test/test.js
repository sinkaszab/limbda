const test = require('tape');
const { reduce } = require('./../index.js');

// TODO: do tests with all kind of collections. Test on strings as well!

test('Reduce an empty collection.', function (t) {
  t.plan(4);
  t.equal(
    reduce((a, v) => a + v, []),
    undefined, "Empty collection without initial value returns undefined."
  );
  t.equal(
    reduce((a, v) => a + v, [], 42),
    42, "Empty collection with initial value returns initial value."
  );
  t.equal(
    reduce((a, v) => a + v, undefined),
    undefined, "Collection == undefined returns undefined|null, aka coll itself."
  );
  t.equal(
    reduce((a, v) => a + v, null, 12),
    12, "If collection undefined, but has initial value, that becomes its return value."
  );
  t.end();
});

test('Reduce a non-empty collection.', function (t) {
  t.plan(2);
  t.equal(
    reduce((a, v) => a + v, [21]),
    21, "A collection with one element will return that one without transformation applied to it."
  );
  t.equal(
    reduce((a, v) => a + v, [1, 2, 3, 4, 5], 0),
    15, "Reduces to appropriate value."
  );
  t.end();
});
