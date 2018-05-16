# limbda

[![Build Status](https://travis-ci.org/sinkaszab/limbda.svg?branch=master)](https://travis-ci.org/sinkaszab/limbda)

## Rationale

After having implemented array reduce with using ES6 features I remembered while having worked with Clojure for a while how nice it was that collection transformations could be done on any type of collection. One of the library's aims is to make transformations work for all collection types as well as implement some functional programming paradigms to make function composing easier.

This library is a playground for me at the same time. It's fun to experiment with basic datastructures and transformations. And also a good place to play with ES6 features also.

## State

Current implementations were not yet benchmarked, so it can easily happen you'll meet performance issues or memory problems (eg.: TCO). Breaking changes might/will happen. Best thing to do if you'd like to sniff around is to check the tests to get a picture how the library methods works.

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

### reduce

Reduce works for all basic Javascript collection types: String, Array, Object, Map & Set. The reducer function should return a value so that reduce will have a reducted value in the end.

```javascript
reduce(reducer: Function, collection: AnyColl?, initialValue: Any?) -> Any?
reducerFunction(accumulator: Any?, item: Any?) -> Any?
```

When reducing an String, Array or Set, item will be a value. In case of key-value types, item will be an Object Entry, a.k.a. an Array of 2 items, `[key, value]`.

```javascript
# String, Array & Set reducer signature:
const reducerA = (accumulator, value) => accumulator + value;
# Object, Map reducer signature:
const reducerB = (accumulator, [key, value]) => accumulator.push(key + value);
```

### map

// TODO: Update for changed reduce if needed, write tests & docs.

### filter

// TODO: Update for changed reduce if needed, write tests & docs.
