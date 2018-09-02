import test from 'tape';
import { range } from './../lib/limbda';

test(
  'range | Args start, end & step throw when any of them is NaN:',
  function throwIfStartEndStepIsNaN(t) {
    const argIsNaNException = new RegExp('Start, end, step arguments cannot be NaN.');
    t.plan(3);
    t.throws( // 1
      () => [...range('a')],
      argIsNaNException, '"start" cannot be NaN.',
    );
    t.throws( // 2
      () => [...range(1, 'a')],
      argIsNaNException, '"end" cannot be NaN.',
    );
    t.throws( // 3
      () => [...range(1, 5, 'a')],
      argIsNaNException, '"step" cannot be NaN.',
    );
  },
);

test(
  'range | the from "start" to "end" set must contain series:',
  function throwIfBoundary(t) {
    const endLessThanStartException = new RegExp('End is less than start, while series is increasing.');
    const endGreaterThanStartException = new RegExp('End is greater than start, while series is decreasing.');
    const seriesIncluded = 'Doesn\'t throw if series is contained by "start-end" interval.';
    t.plan(4);
    t.throws( // 1
      () => [...range(5, 2, +2)],
      endLessThanStartException, '"end" must be greater than start when series is increasing.',
    );
    t.throws( // 2
      () => [...range(1, 10, -2.2)],
      endGreaterThanStartException, '"end" must be less than start when series is increasing.',
    );
    t.doesNotThrow( // 3
      () => [...range(5, -10, -3)],
      endLessThanStartException, seriesIncluded,
    );
    t.doesNotThrow( // 4
      () => [...range(1, 10, 3)],
      endGreaterThanStartException, seriesIncluded,
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
