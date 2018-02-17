const _reduce = (f, a, [h, ...t]) => h != undefined
  ? helper(f, f(a, h), t)
  : a;

const reduce = (f, [h, ...t], i) => i == undefined
  ? !t.length ? h : reduce(f, t, h)
  : _reduce(f, i, [h, ...t]);