import Benchmark from 'benchmark';
import { reduce } from '../dist/limbda';
import _ from 'lodash';

const reduceSuite = new Benchmark.Suite;
const numbersToSum = [];
const sum = (a, v) => a + v;

function *range(start, end) {
  let current = start;
  yield start;
  while (current < end) {
    yield current += 1;
  }
  return end;
}

for (let n of range(0, 10000)) {
  numbersToSum.push(n);
}

reduceSuite
  .add(
    'limbda#reduce | Sum numbers',
    () => reduce(sum, numbersToSum),
  )
  .add(
    'lodash#reduce | Sum numbers',
    () => _.reduce(numbersToSum, sum),
  )
  .add(
    'Array#reduce | Sum numbers',
    () => numbersToSum.reduce(sum),
  )
  .on('complete', function() {
    this.each(bench => console.log(bench.name, bench.stats.mean));
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .on('error', function () {
    console.log(arguments);
  })
  .run({
    'async': true,
  });
