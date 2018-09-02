
function validateRangeParams(args) {
  if (args.some(arg => Number.isNaN(arg))) {
    throw new Error('Start, end, step arguments cannot be NaN.');
  }
}

function isIncreasingWithCheck(start, step, end) {
  const isIncreasing = (start + step) > start;

  if (isIncreasing && end < start) {
    throw new Error('End is less than start, while series is increasing.');
  }
  if (!isIncreasing && end > start) {
    throw new Error('End is greater than start, while series is decreasing.');
  }

  return isIncreasing;
}

export default function *range(start, end, step = 1, inclusive = true) {
  let args, _start, _end, _step;
  args = [_start, _end, _step] = [+start, +end, +step];

  validateRangeParams(args);

  const allArgsInt = args.every(arg => Number.isInteger(arg));
  const maxCeil = allArgsInt ? Number.MAX_SAFE_INTEGER : Number.MAX_VALUE;
  const minFloor = allArgsInt ? Number.MIN_SAFE_INTEGER : Number.MIN_VALUE;
  const isIncreasing = isIncreasingWithCheck(_start, _step, _end);

  if (_end == undefined) _end = isIncreasing ? maxCeil : minFloor;
  const isInBounds = v => isIncreasing ? v < _end : v > _end;

  let current = _start;
  do {
    yield current;
  } while (isInBounds(current += _step));

  if (inclusive) yield _end;
}
