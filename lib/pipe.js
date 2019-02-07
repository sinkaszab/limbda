import reduce from './reduce';

function pipe(...fns) {
  // TODO: data -> ...data | collect args, don't just accept unary arg.
  return (data) => reduce((value, fn) => fn(value), fns, data);
}

export default pipe;
