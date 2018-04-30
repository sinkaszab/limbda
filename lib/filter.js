import reduce from './reduce';

const filter = (f, coll) => reduce((a, v) => (f(v) ? a.push(v) && a : a), coll, []);

export default filter;
