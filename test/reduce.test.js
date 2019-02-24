import test from 'tape';
import { reduce } from '../dist/limbda';

test(
  'reduce | Required arguments:',
  function testRequiredArguments(t) {
    const collErrorRegex = new RegExp('boolean, number and symbol are not collections');
    t.plan(4);
    t.throws( // 1
      () => reduce(module.notAFunction, null),
      /first arg is not a function/, 'First argument must be a function.',
    );
    t.throws( // 2
      () => reduce((a, v) => v, 2),
      collErrorRegex, 'Number not accepted as collection.',
    );
    t.throws( // 3
      () => reduce((a, v) => v, true),
      collErrorRegex, 'Boolean not accepted as collection.',
    );
    t.throws( // 4
      () => reduce((a, v) => v, Symbol('foo')),
      collErrorRegex, 'Symbol not accepted as collection.',
    );
  },
);

test(
  'reduce | Reducer function\'s return value:',
  function testReducerFnsReturnVal(t) {
    t.plan(1);
    t.equal(
      reduce(function dontReturn() { }, [1, 2, 3], 'initialValue'), // eslint-disable-line prefer-arrow-callback
      undefined, 'Functions return `undefined` by default. Accumulated value must be returned by reducer function.',
    );
  },
);

test(
  'reduce | An empty Collection without initial value returns undefined:',
  function testEmptyCollection(t) {
    t.plan(16);
    t.equal( // 1
      reduce((a, v) => a + v, ''),
      undefined, 'Empty String',
    );
    t.equal( // 2
      reduce((a, v) => a + v, []),
      undefined, 'Empty Array',
    );
    t.equal( // 3
      reduce((a, v) => a + v, {}),
      undefined, 'Empty Object',
    );
    t.equal( // 4
      reduce((a, v) => a + v, new Set()),
      undefined, 'Empty Set',
    );
    t.equal( // 5
      reduce((a, v) => a + v, new Map()),
      undefined, 'Empty Map',
    );
    t.equal( // 6
      (function foo() { return reduce((a, v) => a + v, arguments); }()),
      undefined, 'Empty Arguments',
    );
    t.comment('reduce | Empty collection with initial value returns initial value.');
    t.equal( // 7
      reduce((a, v) => a + v, '', 42),
      42, 'Empty String with initial value.',
    );
    t.equal( // 8
      reduce((a, v) => a + v, [], 42),
      42, 'Empty Array with initial value.',
    );
    t.equal( // 9
      reduce((a, v) => a + v, {}, 42),
      42, 'Empty Object with initial value.',
    );
    t.equal( // 10
      reduce((a, v) => a + v, new Map(), 42),
      42, 'Empty Map with initial value.',
    );
    t.equal( // 11
      reduce((a, v) => a + v, new Set(), 42),
      42, 'Empty Set with initial value.',
    );
    t.equal( // 12
      (function foo() { return reduce((a, v) => a + v, arguments, 42); }()),
      42, 'Empty Arguments with initial value.',
    );
    t.comment('reduce | Collection == undefined returns undefined|null, aka coll itself.');
    t.equal( // 13
      reduce((a, v) => a + v, undefined),
      undefined, 'undefined',
    );
    t.equal( // 14
      reduce((a, v) => a + v, null),
      null, 'null',
    );
    t.equal( // 15
      reduce((a, v) => a + v),
      undefined, 'Not passing a collection argument returns undefined.',
    );
    t.equal( // 16
      reduce((a, v) => a + v, null, 12),
      12, 'If collection undefined, but has initial value, that becomes its return value.',
    );
  },
);

test(
  'reduce | A Collection with one element (no initial value) will return that one without transformation applied to it:',
  function testOneElemCollection(t) {
    t.plan(12);
    t.equal( // 1
      reduce((a, v) => a + v + 1, 'a'),
      'a', 'String',
    );
    t.equal( // 2
      reduce((a, v) => a + v + 1, [21]),
      21, 'Array',
    );
    t.deepEquals( // 3
      reduce((a, [k, v]) => a + k + v + 1, { a: 1 }),
      ['a', 1], 'Object',
    );
    t.deepEquals( // 4
      reduce((a, v) => a + v + 1, new Map([['a', 1]])),
      ['a', 1], 'Map',
    );
    t.equal( // 5
      reduce((a, v) => a + v + 1, new Set(['a', 'a', 'a'])),
      'a', 'Set',
    );
    t.equal( // 6
      (function foo() { return reduce((a, v) => a + v + 1, arguments); }(2)),
      2, 'Arguments',
    );
    t.comment('reduce | Collections with one element & initial value set will reduce these two.');
    t.equal( // 7
      reduce((a, v) => a + v, 'g', 'a strin'),
      'a string', 'String',
    );
    t.equal( // 8
      reduce((a, v) => a + v, [21], 21),
      42, 'Array',
    );
    t.deepEquals( // 9
      reduce((a, [k, v]) => ({ ...a, [k]: v }), { first: 'item' }, { initial: 'value' }),
      { first: 'item', initial: 'value' }, 'Object',
    );
    t.deepEquals( // 10
      reduce((a, [k, v]) => a.set(k, v), new Map([['x', 1]]), new Map([['g', 3]])),
      new Map([['x', 1], ['g', 3]]), 'Map',
    );
    t.deepEquals( // 11
      reduce((a, v) => a.add(v), new Set(['b']), new Set(['a'])),
      new Set(['a', 'b']), 'Set',
    );
    t.equal( // 12
      (function reduceArgumentsWithInitial() {
        return reduce((a, v) => a + v, arguments, 1);
      }(2)),
      3, 'Arguments',
    );
  },
);

test(
  'reduce | Reduce different type of collections:',
  function testOnCollections(t) {
    t.plan(6);
    t.equal( // 1
      reduce((a, v) => `${a}:${v}`, 'abc'),
      'a:b:c', 'String',
    );
    t.deepEquals( // 2
      reduce((a, v) => a.splice(0, 0, v + 1) && a, [1, 2, 3, 4, 5], []),
      [6, 5, 4, 3, 2], 'Array',
    );
    t.deepEquals( // 3
      reduce((a, [k, v]) => {
        a[`${k}X`] = v + 1; // eslint-disable-line no-param-reassign
        return a;
      }, {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6,
      }, {}),
      {
        aX: 2, bX: 3, cX: 4, dX: 5, eX: 6, fX: 7,
      }, 'Object',
    );
    t.equal( // 4
      reduce((a, [k, v]) => a + k + v, new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6]]), ''),
      'a1b2c3d4e5f6', 'Map',
    );
    t.equal( // 5
      reduce((a, v) => a * v, new Set([1, 2, 2, 3, 4, 4, 4, 5, 6])),
      720, 'Set',
    );
    t.equal( // 6
      (function reduceArguments() {
        return reduce((a, v) => a * v, arguments);
      }(1, 2, 3, 4, 5, 6)),
      720, 'Arguments',
    );
  },
);
