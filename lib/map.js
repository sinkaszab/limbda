import reduce from './reduce';

const map = (f, coll) => reduce((a, v) => a.push(f(v)) && a, coll, []);

export default map;
