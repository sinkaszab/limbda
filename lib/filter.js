'use strict';

const reduce = require('./reduce');

const filter = (f, coll) => reduce((a, v) => !!f(v) ? a.push(v) && a : a, coll, []);

module.exports = filter;
