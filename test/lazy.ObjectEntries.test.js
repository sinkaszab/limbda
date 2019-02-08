import test from 'tape';
import { lazy } from '../dist/limbda';

const { ObjectEntries } = lazy;

test(
  'lazy.ObjectEntries | Exhausted generated result is equivalent to Object.entries.',
  function iterate(t) {
    t.plan(1);
    const simpleObj = { a: 'a', b: 'b' };
    const generatedEntries = [];
    /* eslint-disable no-restricted-syntax */
    for (const entry of ObjectEntries(simpleObj)) {
      generatedEntries.push(entry);
    }
    /* eslint-enable no-restricted-syntax */
    t.deepEquals(
      generatedEntries,
      Object.entries(simpleObj),
      'for Object literal'
    );
  },
);
