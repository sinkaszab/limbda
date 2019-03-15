const typeBlackList = new Set(['boolean', 'number', 'symbol']);

export function validateArgs(fn, coll) {
  if (typeof fn !== 'function') throw new TypeError('first arg is not a function');

  const collectionType = typeof coll;
  if (typeBlackList.has(collectionType)) {
    throw new TypeError('boolean, number and symbol are not collections');
  }
}
