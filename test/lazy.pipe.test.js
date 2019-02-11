import test from 'tape';
import { lazy } from '../dist/limbda';

const { pipe } = lazy;

test('lazy pipe | composes from left to right', (t) => {
  const inc = (v) => v + 1;
  const dup = (v) => v * 2;
  t.plan(1);
  t.deepEquals(
    [...(pipe(inc, dup)([20, 40, 80]))],
    [42, 82, 162],
  );
});
