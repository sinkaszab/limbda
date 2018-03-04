'use strict';

const _reduce = (f, a, [h, ...t]) => h != undefined
  ? _reduce(f, f(a, h), t)
  : a;

const helper = (f, [h, ...t], i) => i == undefined
  ? !t.length ? h : helper(f, t, h)
  : _reduce(f, i, [h, ...t]);

const reduce = (f, coll, i) => 'entries' in coll
  ? helper(f, coll.entries(), i)
  : helper(f, Object.entries(coll), i);

module.exports = reduce;

