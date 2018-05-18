import test from 'tape';
import { map } from './../lib/limbda';

test('map | Required arguments:', (t) => {
  const collErrorRegex = new RegExp('boolean, number and symbol are not collections');
  t.plan(4);
  t.throws( // 1
    () => map(module.notAFunction, null),
    /first arg is not a function/, 'First argument must be a function.',
  );
  t.throws( // 2
    () => map(v => v + 1, 2),
    collErrorRegex, 'Number not accepted as collection.',
  );
  t.throws( // 3
    () => map(v => v + 1, true),
    collErrorRegex, 'Boolean not accepted as collection.',
  );
  t.throws( // 4
    () => map(v => v + 1, Symbol('foo')),
    collErrorRegex, 'Symbol not accepted as collection.',
  );
});

test('map | Map an empty Collection returns an empty Array:', (t) => {
  t.plan(9);
  t.deepEquals( // 1
    map(v => `${v}x`, ''),
    [], 'Empty String',
  );
  t.deepEquals( // 2
    map(v => v + 1, []),
    [], 'Empty Array',
  );
  t.deepEquals( // 3
    map(v => v + 1, {}),
    [], 'Empty Object',
  );
  t.deepEquals( // 4
    map(v => v + 1, new Set()),
    [], 'Empty Set',
  );
  t.deepEquals( // 5
    map(v => v + 1, new Map()),
    [], 'Empty Map',
  );
  t.deepEquals( // 6
    (function foo() { return map(v => v + 1, arguments); }()),
    [], 'Empty Arguments',
  );
  t.comment('map | Empty Collection as undefined returns an empty Array:');
  t.deepEquals( // 7
    map(v => v + 1, undefined),
    [], 'undefined',
  );
  t.deepEquals( // 8
    map(v => v + 1, null),
    [], 'null',
  );
  t.deepEquals( // 9
    map(v => v + 1),
    [], 'Not passing a collection argument.',
  );
});

test('map | Map a Collection with one element will return an Array with one mapped element:', (t) => {
  t.plan(6);
  t.deepEquals( // 1
    map(s => s.codePointAt(0), ['a']),
    [97], 'String (1 char)',
  );
  t.deepEquals( // 2
    map(v => v * v, [2]),
    [4], 'Array',
  );
  t.deepEquals( // 3
    map(([k, v]) => `${v}${k}`, { n: 1 }),
    ['1n'], 'Object',
  );
  t.deepEquals( // 4
    map(([k, v]) => `${v}${k}`, new Map([['n', 1]])),
    ['1n'], 'Map',
  );
  t.deepEquals( // 5
    map(v => v.toUpperCase(), new Set(['n', 'n'])),
    ['N'], 'Set',
  );
  t.deepEquals( // 6
    (function mapArgumentsOfOne() {
      return map(v => v * v, arguments);
    }(2)),
    [4], 'Arguments',
  );
});

test('map | Map different type of collections:', (t) => {
  t.plan(6);
  t.equal( // 1
    map(s => s.toUpperCase(), 'mapme').join(''),
    'MAPME', 'String',
  );
  t.deepEquals( // 2
    map(v => v + 1, [1, 2, 3, 4, 5]),
    [2, 3, 4, 5, 6], 'Array',
  );
  t.deepEquals( // 3
    map(([k, v]) => k + v, { a: 1, b: 2, c: 3 }),
    ['a1', 'b2', 'c3'], 'Object',
  );
  t.deepEquals( // 4
    map(
      ([k, v]) => k + v,
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ),
    ['a1', 'b2', 'c3'], 'Map',
  );
  t.deepEquals( // 5
    map(v => v + 1, new Set([1, 2, 2, 3, 4, 4, 4, 5, 6])).sort(),
    [2, 3, 4, 5, 6, 7], 'Set',
  );
  t.deepEquals( // 6
    (function mapArguments() {
      return map(v => v + 1, arguments);
    }(1, 2, 3, 4, 5, 6)),
    [2, 3, 4, 5, 6, 7], 'Arguments',
  );
});
