# limbda

[![Build Status](https://travis-ci.org/sinkaszab/limbda.svg?branch=master)](https://travis-ci.org/sinkaszab/limbda)

## Rationale

After having implemented array reduce with using ES6 features I remembered while having worked with Clojure for a while how nice it was that collection transformations could be done on any type of collection. One of the library's aims is to make transformations work for all collection types as well as implement some functional programming paradigms to make function composing easier.

This library is a playground for me at the same time. It's fun to experiment with basic datastructures and transformations. And also a good place to play with ES6 features also.

## State

Creation of proper benchmarking is in progress.

**Sample,** sum 10 000 numbers:

limbda#reduce | Sum numbers 0.00011549035685890135

lodash#reduce | Sum numbers 0.00012098247137972124

Array#reduce  | Sum numbers 0.00006934145322898773

Breaking changes might happen. Best thing to do if you'd like to sniff around is to check the tests to get a picture how the library methods work. (Tests keep the contract for the functions' interface, check them for change between commits before you upgrade to a new version.)

## Install

`npm install limbda`

## Usage

Import as you would any other packege in Node.js, eg.:

`const limbda = require('limbda');`

## Documentation

### isIterable

Check if `x` implements the iterable interface/protocol. (ES6 rest/spread operations, also generators need iterables.)

```js
isIterable(x: Any?) -> Boolean
```

### reduce, map, filter

Reduce, map & filter work for all basic Javascript collection types: String, Array, Object, Map, Set & Arguments (Array-likes).

#### Transforming functions

When reducing, mapping or filtering an String, Array or Set, item will be a value. In case of key-value types, item will be an "Object Entry", a.k.a. an Array of 2 items, a pair, `[key, value]`. See signatures.

The transforming functions should return a value so that collection transformation will have a "worthwhile" final value in the end.

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
