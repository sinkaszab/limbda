function* ObjectEntries(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      yield [prop, obj[prop]];
    }
  }
}

export default ObjectEntries;
