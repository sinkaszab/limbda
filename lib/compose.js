import { reduce } from './reduce';

/**
 * Adapted compose from Redux, because
 * it's an elegant solution.
 */
function compose(...fns) {
  if (fns.length === 0) {
    return arg => arg;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return reduce((a, b) => (...args) => a(b(...args)), fns);
}

export default compose;
