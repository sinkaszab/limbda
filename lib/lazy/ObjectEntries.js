function* ObjectEntries(obj) {
  /* eslint-disable no-restricted-syntax */
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      yield [prop, obj[prop]];
    }
  }
  /* eslint-enable no-restricted-syntax */
}

export default ObjectEntries;
