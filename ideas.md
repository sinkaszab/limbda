# Ideas for List

## list()

- Accept any Collection type. Accepts only 1 argument.
- List is built up from ListItems which themselves are iterables with exactly one next referencing the next node.
- Lists are immutable!
- list() returns an iterator (& iterable at once).

## Use case for another type of implementation of reduce

- Could it be possible to "iterate" through a reducing process with lists?
- Or just implement reduce with iterator.
- Quite a good use case for map.

## pipe?

- Execute next function with iterator.next call passing down previous result.

