
function validateRangeParams(args) {
  if (args.some(arg => Number.isNaN(arg))) {
    throw new Error('Start, end, step arguments cannot be NaN.');
  }
}

function validateRangeIsSubset(isIncreasing, start, end) {
  if (isIncreasing && end < start) {
    throw new Error('End is less than start, while series is increasing.');
  }
  if (!isIncreasing && end > start) {
    throw new Error('End is greater than start, while series is decreasing.');
  }
}

export default function *range(...options) {
  // REVIEW: how this range thing should work
  // range(10) => [0...9] not including 10
  // range(2, 21) => [2...20] = range(2, 21, false)
  // range(2, 20, true) => [2...20]
  // range(2, 21, 2) => [2, 4, 6...20] = range(2, 21, 2, false)
  // range(2, 20, 2, true) => [2, 4, 6...20]

  // let args, _start, _end, _step;
  // args = [_start, _end, _step] = [+start, +end, +step];

  // const someArgIsFloat = args.some(arg => !Number.isInteger(arg));
  // const maxCeil = someArgIsFloat ? Number.MAX_VALUE : Number.MAX_SAFE_INTEGER;
  // const minFloor = someArgIsFloat ? Number.MIN_VALUE : Number.MIN_SAFE_INTEGER;
  // const isIncreasing = (_start + _step) > _start;
  // if (end == null) _end = isIncreasing ? maxCeil : minFloor;

  // validateRangeParams([_start, _end, _step]);
  // validateRangeIsSubset(isIncreasing, _start, _end);

  // const isInBounds = v => isIncreasing ? v < _end : v > _end;

  // let current = _start;
  // do {
  //   yield current;
  // } while (isInBounds(current += _step));

  // if (inclusive) yield _end;
}
