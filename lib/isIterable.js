'use strict';

const isIterable = coll => Boolean(coll) && typeof coll[Symbol.iterator] === 'function';

module.exports = isIterable;
