’use strict’;

const isIterable = coll => coll != null && typeof coll[Symbol.iterator] === 'function';

module.exports = isIterable;
