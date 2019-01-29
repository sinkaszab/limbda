import isIterable from './../isIterable';
import map from './../map';
import { default as eagerPipe } from './../pipe';

function createStep(fn) {
  return function* step(iterator) {
    /* eslint-disable no-restricted-syntax */
    for (const item of iterator) {
      yield isIterable(item) ? fn(...item) : fn(item);
    }
    /* eslint-enable no-restricted-syntax */
  };
}

function pipe(...fns) {
  return eagerPipe(...map(createStep, fns));
}

export default pipe;
