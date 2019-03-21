import reduce from './reduce';
import { validateArgs } from './helpers';

function reduceRight(reducer, coll, initialVal) {
  validateArgs(reducer, coll);

  if (coll == undefined) {
    return initialVal !== undefined ? initialVal : coll;
  }

  let clean = true;

  const rightReducer = (push, next) => acc => {
    if (acc === undefined && clean) {
      clean = false;
      return push(next);
    }
    return push(reducer(acc, next));
  };

  return reduce(rightReducer, coll, x => x)(initialVal);
}

export default reduceRight;
