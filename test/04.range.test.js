import test from 'tape';
import { range } from './../lib/limbda';

test(
  'range | Args start, end & step throw when any of them is NaN:',
  function throwIfStartEndStepIsNaN(t) {
    const argIsNaNException = new RegExp('Start, end, step arguments cannot be NaN.');
    t.plan(3);
    t.throws( // 1
      () => [...range('a')],
      argIsNaNException, '"start" cannot be NaN.'
    );
    t.throws( // 2
      () => [...range(1, 'a')],
      argIsNaNException, '"end" cannot be NaN.'
    );
    t.throws( // 2
      () => [...range(1, 5, 'a')],
      argIsNaNException, '"step" cannot be NaN.'
    );
  },
);

// test(
//   'range | Test draft:',
//   function testRequiredArguments(t) {
//     t.plan(1);
//     t.deepEquals( // 1
//       [...range(5, 9)],
//       [5, 6, 7, 8, 9], 'Range',
//     );
//   },
// );
