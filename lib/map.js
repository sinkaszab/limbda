import reduce from './reduce';

const _map = (f, coll) => reduce((a, v) => a.push(f(v)) && a, coll, []);

const map = (f, coll) => {
  if (typeof f !== 'function') throw new TypeError('first arg is not a function');
  return _map(f, coll);
};

export default map;
