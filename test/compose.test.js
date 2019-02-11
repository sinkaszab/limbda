import test from 'tape';
import { compose } from '../dist/limbda';

test('compose | composes from right to left', (t) => {
  const double = x => x * 2;
  const square = x => x * x;
  t.plan(3);
  t.equals(
    compose(square)(5),
    25, 'with 1 function as "composition"',
  );
  t.equals(
    compose(square, double)(5),
    100, 'with 2 functions as composition',
  );
  t.equals(
    compose(double, square, double)(5),
    200, 'with more than 2 functions as composition',
  );
});

test('compose | composes from right to left', (t) => {
  const a = next => x => next(x + 'a');
  const b = next => x => next(x + 'b');
  const c = next => x => next(x + 'c');
  const final = x => x;
  t.plan(3);
  t.equals(
    compose(a, b, c)(final)(''),
    'abc',
    'will re-compose reversed (piped) order with a function returning its arg as data to composition #1',
  );
  t.equals(
    compose(b, c, a)(final)(''),
    'bca',
    'will re-compose reversed (piped) order with a function returning its arg as data to composition #2',
  );
  t.equals(
    compose(c, a, b)(final)(''),
    'cab',
    'will re-compose reversed (piped) order with a function returning its arg as data to composition #3',
  );
});

test('compose | throws at runtime if argument is not a function', (t) => {
  const square = x => x * x;
  const add = (x, y) => x + y;
  t.plan(5);
  t.throws(
    () => compose(square, add, false)(1, 2),
    'TypeError', 'Boolean: False',
  );
  t.throws(
    () => compose(square, add, undefined)(1, 2),
    'TypeError', 'undefined',
  );
  t.throws(
    () => compose(square, add, true)(1, 2),
    'TypeError', 'Boolean: True',
  );
  t.throws(
    () => compose(square, add, NaN)(1, 2),
    'TypeError', 'NaN',
  );
  t.throws(
    () => compose(square, add, '42')(1, 2),
    'TypeError', 'String'
  );
  // TODO: test all types.
});

test('compose | can be seeded with multiple arguments', (t) => {
  const square = x => x * x;
  const add = (x, y) => x + y;
  t.plan(1);
  t.equals(
    compose(square, add)(1, 2),
    9, 'for the published function by the composition',
  );
  // TODO: test when not first (last) function accepts multiple args.
});

test('compose | returns the first given argument if given no functions', (t) => {
  t.plan(3);
  t.equals(
    compose()(1, 2),
    1, 'given multiple arguments',
  );
  t.equals(
    compose()(3),
    3, 'given 1 argument',
  );
  t.equals(
    compose()(),
    undefined, 'given no arguments',
  );
});

test('compose | returns the first function', (t) => {
  const fn = () => {};
  t.plan(1);
  t.equals(
    compose(fn),
    fn, 'if given only one',
  );
});
