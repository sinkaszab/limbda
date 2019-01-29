import reduce from './reduce';

function pipe(...fns) {
  return (data) => reduce((value, fn) => fn(value), fns, data);
}

export default pipe;
