const test = require('tape');
const { reduce } = require('./../index.js');

test("Required arguments:", function (t) {
  const collErrorRegex = new RegExp('boolean, number and symbol are not collections');
  t.plan(4);
  t.throws( // 1
    () => reduce(module.notAFunction, null),
    /first arg is not a function/, "First argument must be a function."
  );
  t.throws( // 2
    () => reduce((a, v) => v, 2),
    collErrorRegex, "Number not excepted as collection."
  );
  t.throws( // 3
    () => reduce((a, v) => v, true),
    collErrorRegex, "Boolean not excepted as collection."
  );
  t.throws( // 4
    () => reduce((a, v) => v, Symbol('foo')),
    collErrorRegex, "Symbol not excepted as collection."
  );
});

test('Reduce an empty collection:', function (t) {
  t.plan(5);
  t.equal( // 1
    reduce((a, v) => a + v, []),
    undefined, "Empty collection without initial value returns undefined."
  );
  t.equal( // 2
    reduce((a, v) => a + v, [], 42),
    42, "Empty collection with initial value returns initial value."
  );
  t.equal( // 3
    reduce((a, v) => a + v, undefined),
    undefined, "Collection == undefined returns undefined|null, aka coll itself."
  );
  t.equal( // 4
    reduce((a, v) => a + v),
    undefined, "Not passing a collection argument returns undefined."
  );
  t.equal( // 5
    reduce((a, v) => a + v, null, 12),
    12, "If collection undefined, but has initial value, that becomes its return value."
  );
});

test('Reduce a non-empty collection:', function (t) {
  t.plan(3);
  t.equal( // 1
    reduce((a, v) => ++v, [21]),
    21, "A collection with one element will return that one without transformation applied to it."
  );
  t.equal( // 2
    reduce((a, v) => a + v, [21], 21),
    42, "A collection with one element and initial value set will reduce these two."
  );
  t.equal( // 3
    reduce((a, v) => a + v, [1, 2, 3, 4, 5], 0),
    15, "Reduces to appropriate value."
  );
});

test('Reduce different type of collections:', function (t) {
  t.plan(5)
  t.equal( // 1
    reduce((a, v) => `${a}:${v}`, "abc"),
    "a:b:c", "Reduce String."
  );
  t.deepEquals( // 2
    reduce((a, v) => a.splice(0, 0, ++v) && a, [1, 2, 3, 4, 5], []),
    [6, 5, 4, 3, 2], "Reduce Array."
  );
  t.deepEquals( // 3
    reduce((a, [k, v]) => {
      a[`${k}X`] = ++v;
      return a;
    }, {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, {}
  ),
    {aX: 2, bX: 3, cX: 4, dX: 5, eX: 6, fX: 7}, "Reduce Object"
  );
  t.equal( // 4
    reduce((a, [k, v]) => a + k + v, new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6]]), ''),
    'a1b2c3d4e5f6', "Reduce Map"
  );
  t.equal( // 5
    reduce((a, v) => a * v, new Set([1, 2, 2, 3, 4, 4, 4, 5, 6])),
    720, "Reduce Set"
  );
});
