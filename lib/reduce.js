import isIterable from './isIterable';

function _reduce(fn, accumulatedVal, [head, ...tail]) {
  if (head != undefined) return _reduce(fn, fn(accumulatedVal, head), tail);
  return accumulatedVal;
}

function startReduceWithContext(fn, [head, ...tail], initialVal) {
  if (initialVal == undefined) {
    if (!tail.length) return head;
    return startReduceWithContext(fn, tail, head);
  }
  return _reduce(fn, initialVal, [head, ...tail]);
}

export default function reduce(fn, coll, initialVal) {
  if (typeof fn !== 'function') throw new TypeError('first arg is not a function');

  const collectionType = typeof coll;
  const typeBlackList = new Set(['boolean', 'number', 'symbol']);
  if (typeBlackList.has(collectionType)) {
    throw new TypeError('boolean, number and symbol are not collections');
  }

  if (coll == undefined) {
    if (initialVal == undefined) return coll; // null|undefined
    return initialVal;
  }

  // REVIEW: arguments[1] should be handled inside startReduceWithContext.
  return startReduceWithContext(fn, isIterable(coll) ? coll : Object.entries(coll), initialVal);
}
