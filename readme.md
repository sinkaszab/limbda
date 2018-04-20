# limbda

## Rationale

After having implemented array reduce with using ES6 features I remembered while having worked with Clojure for a while how nice it was that collection transformations could be done on any type of collection. One of the library's aims is to make transformations work for all collection types as well as implement some functional programming paradigms to make function composing easier.

This library is a playground for me at the same time. It's fun to experiment with basic datastructures and transformations. And also a good place to play with ES6 features also.

## State

Current implementations were not yet benchmarked, so it can easily happen you'll meet performance issues or memory problems. Breaking changes might/will happen. Best thing to do if you'd like to sniff around is to check the tests to get a picture how the library works.

## Install

`npm install limbda`

## Usage

Import as you would any other packege in Node.js, eg.:

`const limbda = require('limbda');`

## Documentation

## isIterable

Check if `x` implements the iterable interface/protocol. (ES6 rest/spread operations, also generators need iterables.)

```javascript
isIterable(x: Any?) -> Bool
```

### reduce

// TODO...

### map

// TODO ...

### filter

// TODO...
