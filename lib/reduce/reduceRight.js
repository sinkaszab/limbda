import reduce from './reduce';
import { validateArgs } from './helpers';

function reduceRight(reducer, coll, initialVal) {
  validateArgs(reducer, coll);

  if (coll == undefined) {
    return initialVal != undefined ? initialVal : coll;
  }

  const rightReducer = (f, v) => a => f(a === undefined ? v : reducer(a, v));
  return reduce(rightReducer, coll, x => x)(initialVal);
}

export default reduceRight;
