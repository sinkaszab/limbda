import isIterable from './isIterable';

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
  if (typeof fn !== 'function') throw new TypeError('first arg is not a function');

  const collectionType = typeof coll;
  const typeBlackList = new Set(['boolean', 'number', 'symbol']);
  if (typeBlackList.has(collectionType)) {
    throw new TypeError('boolean, number and symbol are not collections');
  }

  if (coll == undefined) {
    return initialVal != undefined ? initialVal : coll;
  }

  const collectionIterator = (
    isIterable(coll)
      ? coll
      // REVIEW: entries is not lazy
      // FIXME: replace with custom iterator.
      // eg. for-in wrapped into a custom iterator.
      : Object.entries(coll)
  )[Symbol.iterator]();
  return startReduceWithContext(fn, collectionIterator, initialVal);
}
