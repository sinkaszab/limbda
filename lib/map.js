'use strict';

const reduce = require('./reduce');

const map = (f, coll) => (f, coll) => reduce((a, v) => a.push(f(v)) && a, coll, []);

module.exports = map;
