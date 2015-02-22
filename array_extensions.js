function ArrayWrap(array) {
  this.array = array;
  for(var i = 0; i < array.length; i++) {
    this[i] = array[i];
  }
}

Object.getOwnPropertyNames(Array.prototype).forEach(function(method) {
  ArrayWrap.prototype[method] = function() {
    return new ArrayWrap(
      Array.prototype[method].apply(this.array, arguments)
    );
  }
});

ArrayWrap.prototype.mapDo = function(method) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this.map(function(element) {
    return element[method].apply(element, args);
  });
}
