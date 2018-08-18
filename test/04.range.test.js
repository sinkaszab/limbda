import test from 'tape';
import { range } from './../lib/limbda';

test(
  'range | Test draft:',
  function testRequiredArguments(t) {
    t.plan(1);
    t.deepEquals( // 1
      [...range(5, 9)],
      [5, 6, 7, 8, 9], 'Range',
    );
  },
);
