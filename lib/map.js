'use strict';

const reduce = require('./reduce');

const _map = (f, coll) => reduce((a, v) => a.push(f(v)) && a, coll, []);

const map = (f, coll) => _map(f, coll);

module.exports = map;