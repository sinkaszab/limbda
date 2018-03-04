'use strict';

const reduce = require('./lib/reduce.js');
const map = require('./lib/map.js');
const filter = require('./lib/filter.js');

const fmin = { reduce, map, filter };

module.exports = fmin;

