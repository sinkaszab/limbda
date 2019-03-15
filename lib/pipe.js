import { reduceRight } from './reduce';

function pipe(...fns) {
  if (fns.length === 0) {
    return arg => arg;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return reduceRight((a, b) => (...args) => a(b(...args)), fns);
}

export default pipe;
