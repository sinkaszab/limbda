// import test from 'tape';
import { lazy } from '../dist/limbda';

const { pipe } = lazy;

const inc = (v) => v + 1;
const dup = (v) => v * 2;

const lazyPiped = pipe(inc, dup);

console.log([...lazyPiped([20, 40, 80])]);
