import reduce from './reduce';

export default function *range(start, end, step = 1, inclusive = true) {
  const args = [+start, +end, +step];
  const argIsNaN = reduce(
    (acc, val) => acc |= Number.isNaN(val), // eslint-disable-line no-param-reassign
    args,
    false,
  );
  if (argIsNaN) throw new Error('Start, end, step arguments cannot be NaN.');

  // const argsAreIntegers = args
  //   .reduce((acc, val) => (acc &= Number.isInteger(val)), true);

  // const maxCeil = argsAreIntegers ? Number.MAX_SAFE_INTEGER : Number.MAX_VALUE;
  // const minFloor = argsAreIntegers ? Number.MIN_SAFE_INTEGER : Number.MIN_VALUE;
  // const isIncreasing = (start + step) > start;

  // if (isIncreasing && end < start) {
  //   throw new Error('End is less than start, while series is increasing.');
  // }
  // if (!isIncreasing && end > start) {
  //   throw new Error('End is greater than start, while series is decreasing.');
  // }

  // if (end == undefined) end = isIncreasing ? maxCeil : minFloor;

  // const isInBounds = v => isIncreasing ? v < end : v > end;

  // let current = start;
  // do {
  //   yield current;
  // } while (isInBounds(current += step));

  // if (inclusive) yield end;
  // return;
}
