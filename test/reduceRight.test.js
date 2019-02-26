import test from 'tape';
import { reduceRight } from '../dist/limbda';

test(
  'just start with a "test"',
  function testFn(t) {
    t.plan(1);
    t.equals(
      reduceRight((a, v) => a + v, [2, 3], 1),
      6
    );
  },
);
