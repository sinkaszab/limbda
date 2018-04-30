const isIterable = coll => Boolean(coll) && typeof coll[Symbol.iterator] === 'function';

export default isIterable;
