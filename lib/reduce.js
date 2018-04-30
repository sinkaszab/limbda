import isIterable from './isIterable';

const _reduce = (f, a, [h, ...t]) => (h != undefined
  ? _reduce(f, f(a, h), t)
  : a);

const helper = (f, [h, ...t], i) => (i == undefined
  ? !t.length ? h : helper(f, t, h)
  : _reduce(f, i, [h, ...t]));

const reduce = (f, coll, i) => {
  if (typeof f !== 'function') throw new TypeError('first arg is not a function');
  const collectionType = typeof coll;
  if (
    collectionType === 'boolean'
    || collectionType === 'number'
    || collectionType === 'symbol'
  ) throw new TypeError('boolean, number and symbol are not collections');
  return (
    coll != undefined
      ? helper(f, isIterable(coll) ? coll : Object.entries(coll), i)
      : i != undefined ? i : coll
  );
};

export default reduce;
