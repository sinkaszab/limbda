import test from 'tape';
import { pipe } from '../dist/limbda';

test('pipe | composes left to right', (t) => {
  const double = x => x * 2;
  const square = x => x * x;
  const add = (x, y) => x + y;
  t.plan(2);
  t.equals(
    pipe(square, double)(3),
    18, '2 functions'
  );
  t.equals(
    pipe(add, square, double)(3, 2),
    50, 'can be seeded with multiple arguments',
  );
});
