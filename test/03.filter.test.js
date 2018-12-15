import test from 'tape';
import { filter } from '../dist/limbda';

test(
  'filter | Required arguments:',
  function testRequiredArguments(t) {
    const collErrorRegex = new RegExp('boolean, number and symbol are not collections');
    t.plan(4);
    t.throws( // 1
      () => filter(module.notAFunction, null),
      /first arg is not a function/, 'First argument must be a function.',
    );
    t.throws( // 2
      () => filter(v => !!v, 2),
      collErrorRegex, 'Number not accepted as collection.',
    );
    t.throws( // 3
      () => filter(v => !!v, true),
      collErrorRegex, 'Boolean not accepted as collection.',
    );
    t.throws( // 4
      () => filter(v => !!v, Symbol('foo')),
      collErrorRegex, 'Symbol not accepted as collection.',
    );
  },
);

test(
  'filter | Filter an empty Collection returns an empty Array:',
  function testEmptyColl(t) {
    t.plan(9);
    t.deepEquals( // 1
      filter(v => !!v, ''),
      [], 'Empty String',
    );
    t.deepEquals( // 2
      filter(v => !!v, []),
      [], 'Empty Array',
    );
    t.deepEquals( // 3
      filter(v => !!v, {}),
      [], 'Empty Object',
    );
    t.deepEquals( // 4
      filter(v => !!v, new Set()),
      [], 'Empty Set',
    );
    t.deepEquals( // 5
      filter(v => !!v, new Map()),
      [], 'Empty Map',
    );
    t.deepEquals( // 6
      (function foo() { return filter(v => !!v, arguments); }()),
      [], 'Empty Arguments',
    );
    t.comment('filter | Empty Collection as undefined returns an empty Array:');
    t.deepEquals( // 7
      filter(v => !!v, undefined),
      [], 'undefined',
    );
    t.deepEquals( // 8
      filter(v => !!v, null),
      [], 'null',
    );
    t.deepEquals( // 9
      filter(v => !!v),
      [], 'Not passing a collection argument.',
    );
  },
);

test(
  'filter | Filtering function\'s return value:',
  function testFilteringFnsReturnVal(t) {
    t.plan(1);
    t.deepEquals(
      filter(function intentionallyNoReturn() {
      }, [1, 2]), // eslint-disable-line prefer-arrow-callback
      [], 'Like no member matches the filter, result is an empty Array.',
    );
  },
);

test(
  'filter | Filter different type of collections:',
  function testOnCollections(t) {
    t.plan(6);
    t.deepEquals( // 1
      filter(char => char === 'e', 'filterme'),
      ['e', 'e'], 'String',
    );
    t.deepEquals( // 2
      filter(n => n > 2, [1, 2, 3, 4, 5]),
      [3, 4, 5], 'Array',
    );
    t.deepEquals( // 3
      filter(([k, v]) => v > 1, { a: 1, b: 2, c: 3 }), // eslint-disable-line no-unused-vars
      [['b', 2], ['c', 3]], 'Object',
    );
    t.deepEquals( // 4
      filter(
        ([k, v]) => k.startsWith('t'), // eslint-disable-line no-unused-vars
        new Map([['time', 'Zeit'], ['desk', 'Tisch'], ['tiny', 'klein']]),
      ),
      [['time', 'Zeit'], ['tiny', 'klein']], 'Map',
    );
    function compare(a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
    t.deepEquals( // 5
      filter(v => v > 4, new Set([1, 2, 2, 3, 4, 4, 4, 5, 6])).sort(compare),
      [5, 6], 'Set',
    );
    t.deepEquals( // 6
      (function filterArguments() {
        return filter(v => v > 3, arguments);
      }(1, 2, 3, 4, 5, 6)),
      [4, 5, 6], 'Arguments',
    );
  },
);
