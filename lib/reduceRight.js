import reduce from './reduce';

// TODO: need to test this properly!
function reduceRight(reducer, coll, initial) {
  const rightReducer = (f, v) => a => f(a === undefined ? v : reducer(a, v));
  return reduce(rightReducer, coll, x => x)(initial);
}

export default reduceRight;
