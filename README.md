# limbda

## Rationale

After having implemented array reduce with using ES6 features I remembered while having worked with Clojure for a while how nice it was that collection transformations could be done on any type of collection. One of the library's aims is to make transformations work for all collection types as well as implement some functional programming paradigms to make function composing easier.

The aim is not to imlement a Lisp-ish JavaScript, but to adapt functional abstractions.

## State

Current implementations were not yet benchmarked, so it can easily happen you'll meet performance issues. Breaking changes might happen. This library is yet in its very-very early stage. Consider it an experiment.

## Usage

Install:

`npm install limbda`

Import as you would any other packege in Node.js, eg.:

`const limbda = require('limbda');`

## Documentation

[limbda - docs](doc/index)