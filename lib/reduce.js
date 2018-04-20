'use strict';

const isIterable = require('./isIterable');

const _reduce = (f, a, [h, ...t]) => h != undefined
  ? _reduce(f, f(a, h), t)
  : a;

const helper = (f, [h, ...t], i) => i == undefined
  ? !t.length ? h : helper(f, t, h)
  : _reduce(f, i, [h, ...t]);

const reduce = (f, coll, i) => coll != undefined
  ? helper(f, isIterable(coll) ? coll : Object.entries(coll), i)
  : i != undefined ? i : coll;

module.exports = reduce;
