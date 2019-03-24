# limbda

[![Build Status](https://travis-ci.org/sinkaszab/limbda.svg?branch=master)](https://travis-ci.org/sinkaszab/limbda)

## Rationale

The library was born out of an experiment to be able to
reduce all native JavaScript collections. It has been achieved
that reduce, map and filter work properly (as much as the tests
can prove).

It is continuously being extended with functional programming
utilities with only putting in the minimum set needed.

## What to consider before jumping on the limbda train

- Breaking changes might happen.
- To get a full picture check the tests.
- Implementations might contain bugs for edge cases.

## What about performance

There are some rudimentary benchmarks to native & `lodash` functions.
You can find them in the repository. The goal is to be at least that performant
as `lodash` is. Benchmarking is mostly done to identify huge performance
bottlenecks rather than trying to microoptimize the library.

Also it's currently tested against a transpiled code. Without `babel` transpilation
StackOverflow caused by tail calls would be unavoidable in Node.js 8.11 version for
example. Also benchmarking should be "dockerized" to be able to do testing on
all versions above the minimum required.

## Install

`npm install limbda`

## Usage

Import as you would any other package in Node.js, eg.:

`const limbda = require('limbda');`

or if ES6 syntax works:

`import { reduce } from 'limbda';`

## Documentation

### isIterable

Check if `x` implements the iterable interface/protocol.
(ES6 rest/spread operations, also generators need iterables.)

```js
isIterable(x: Any?) -> Boolean
```

### reduce, map, filter

Reduce, map & filter work for all native JavaScript collection types:
String, Array, Object, Map, Set & Arguments (Array-likes).

#### Transforming functions

I call callbacks accepted by reduce, map & filter "transforming functions". As map & filter are both implemented with reduce basically their callback is a specialized type of reducer function.

**Important:** The transforming functions should return a value so that collection transformation will have a "worthwhile" final value in the end.

Transforming functions receive a collection's element one by one. When working with key-value
type collections, a pair will be passed--an "Object Entry". Map will output key-value type
collections as an array of Object Entries: `-> [ [ key: value ], [ key: value ] ]`.

### reduce

```javascript
reduce(reducer: Function, collection: AnyColl?, initialValue: Any?) -> Any?

reducerFunction(accumulator: Any?, item: Any?) -> Any?
```

```javascript
# String, Array & Set reducer signature:
const reducerA = (accumulator, value) => accumulator + value;

# Object, Map reducer signature:
const reducerB = (accumulator, [key, value]) => accumulator + (key + value);
```

### map

```javascript
map(transformer: Function, collection: AnyColl?) -> Array

transformerFunction(value: Any?) -> Any?
```

```javascript
# String, Array & Set transformer signature:
const transformerA = value => f(value);

# Object, Map transformer signature:
const transformerB = ([key, value]) => f(key, value);
```

### filter

```javascript
filter(filtering: Function, collection: AnyColl?) -> Array

filteringFunction(value: Any?) -> Bool?
```

```javascript
# String, Array & Set filtering signature:
const filteringFnA = value => f(value);

# Object, Map filtering signature:
const filteringFnB = ([key, value]) => f(key, value);
```

### compose

```javascript
const composition = compose(funcN, funcN-1, funcN-2, ..., func2, func1) -> Any?
const result = composition(value1: Any?, value2: Any?, ...,valueN-2: Any?, valueN-1: Any?, valueN: Any?);
```

### pipe

```javascript
const composition = pipe(func1, func2, ..., funcN-2, funcN-1, funcN) -> Any?
const result = composition(value1: Any?, value2: Any?, ...,valueN-2: Any?, valueN-1: Any?, valueN: Any?);
```

### lazy.ObjectEntries

```javascript
const iterator = lazy.ObjectEntries(obj: AnyObject);
```

### lazy.pipe (stream mapping)

```javascript
const streamMap = lazy.pipe(func1, func2, ..., funcN-2, funcN-1, funcN);
```
