import test from 'tape';
import { pipe } from '../dist/limbda';

test('pipe | composes from left to right', (t) => {
  const double = x => x * 2;
  const square = x => x * x;
  t.plan(3);
  t.equals(
    pipe(square)(5),
    25, 'with 1 function as "composition"',
  );
  t.equals(
    pipe(double, square)(5),
    100, 'with 2 functions as composition',
  );
  t.equals(
    pipe(double, square, double)(5),
    200, 'with more than 2 functions as composition',
  );
});

test('pipe | composes from right to left', (t) => {
  const a = next => x => next(x + 'a');
  const b = next => x => next(x + 'b');
  const c = next => x => next(x + 'c');
  const final = x => x;
  t.plan(3);
  t.equals(
    pipe(c, b, a)(final)(''),
    'abc',
    'will re-compose reversed (piped) order with a function returning its arg as data to composition #1',
  );
  t.equals(
    pipe(c, b, a)(final)(''),
    'abc',
    'will re-compose reversed (piped) order with a function returning its arg as data to composition #2',
  );
  t.equals(
    pipe(c, a, b)(final)(''),
    'bac',
    'will re-compose reversed (piped) order with a function returning its arg as data to composition #3',
  );
});

test('pipe | throws at runtime if argument is not a function', (t) => {
  const square = x => x * x;
  const add = (x, y) => x + y;
  const TypeErrorPattern = new RegExp('TypeError');
  t.plan(6);
  t.throws(
    () => pipe(square, add, false)(1, 2),
    TypeErrorPattern, 'Boolean: False',
  );
  t.throws(
    () => pipe(add, square, undefined)(1, 2),
    TypeErrorPattern, 'undefined',
  );
  t.throws(
    () => pipe(undefined, add, square)(1, 2),
    TypeErrorPattern, 'undefined',
  );
  t.throws(
    () => pipe(square, add, true)(1, 2),
    TypeErrorPattern, 'Boolean: True',
  );
  t.throws(
    () => pipe(square, add, NaN)(1, 2),
    TypeErrorPattern, 'NaN',
  );
  t.throws(
    () => pipe(square, add, '42')(1, 2),
    TypeErrorPattern, 'String'
  );
  // TODO: test all types.
});

test('pipe | can be seeded with multiple arguments', (t) => {
  const square = x => x * x;
  const add = (x, y) => x + y;
  t.plan(1);
  t.equals(
    pipe(add, square)(1, 2),
    9, 'for the published function by the composition',
  );
  // TODO: test when not first (last) function accepts multiple args.
});

test('pipe | returns the first given argument if given no functions', (t) => {
  t.plan(3);
  t.equals(
    pipe()(1, 2),
    1, 'given multiple arguments',
  );
  t.equals(
    pipe()(3),
    3, 'given 1 argument',
  );
  t.equals(
    pipe()(),
    undefined, 'given no arguments',
  );
});

test('pipe | returns the first function', (t) => {
  const fn = () => {};
  t.plan(1);
  t.equals(
    pipe(fn),
    fn, 'if given only one',
  );
});
