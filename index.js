'use strict';

const isIterable = require('./lib/isIterable.js');
const reduce = require('./lib/reduce.js');
const map = require('./lib/map.js');
const filter = require('./lib/filter.js');

const limbda = { isIterable, reduce, map, filter };

module.exports = limbda;
