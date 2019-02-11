import test from 'tape';
import { lazy } from '../dist/limbda';

const { ObjectEntries } = lazy;

test(
  'lazy.ObjectEntries | Exhausted generated result',
  function iterate(t) {
    t.plan(3);
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
      'is equivalent to Object.entries'
    );

    const objectWithProto = Object.create(simpleObj);
    objectWithProto.c = 'c';
    objectWithProto.d = 'd';

    const generatedEntriesOfObjectWithProto = [];
    /* eslint-disable no-restricted-syntax */
    for (const entry of ObjectEntries(objectWithProto)) {
      generatedEntriesOfObjectWithProto.push(entry);
    }
    /* eslint-enable no-restricted-syntax */

    t.deepEquals(
      generatedEntriesOfObjectWithProto,
      Object.entries(objectWithProto),
      'lists only Objects\'s own properties (#1)',
    );
    t.deepEquals(
      generatedEntriesOfObjectWithProto,
      [['c', 'c'], ['d', 'd']],
      'lists only Objects\'s own properties (#2)',
    );
  },
);
