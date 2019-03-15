import { reduce } from './reduce';

const _filter = (f, coll) => reduce((a, v) => (f(v) ? a.push(v) && a : a), coll, []);

const filter = (f, coll) => {
  if (typeof f !== 'function') throw new TypeError('first arg is not a function');
  return _filter(f, coll);
};

export default filter;
