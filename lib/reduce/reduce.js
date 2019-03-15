import isIterable from './../isIterable';
import ObjectEntries from './../lazy/ObjectEntries';
import { validateArgs } from './helpers';

function startReduceWithContext(fn, collectionIterator, initialVal) {
  function _reduce(accumulatedVal, { value: nextVal, done }) {
    if (done) return accumulatedVal;
    return _reduce(fn(accumulatedVal, nextVal), collectionIterator.next());
  }

  if (initialVal == undefined) {
    const { value: head, done } = collectionIterator.next();
    if (done) return undefined;
    return startReduceWithContext(fn, collectionIterator, head);
  }
  return _reduce(initialVal, collectionIterator.next());
}

export default function reduce(fn, coll, initialVal) {
  validateArgs(fn, coll);

  if (coll == undefined) {
    return initialVal != undefined ? initialVal : coll;
  }

  const collectionIterator = (
    isIterable(coll)
      ? coll[Symbol.iterator]()
      : ObjectEntries(coll)
  );
  return startReduceWithContext(fn, collectionIterator, initialVal);
}
