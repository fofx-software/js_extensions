function ArrayWrap(array) {
  this.array = array;
  //for(var i = 0; i < array.length; i++) {
  //  this[i] = array[i];
  //}
}

for(var prop in Object.getOwnPropertyNames(Array.prototype)) {
  ArrayWrap.prototype[prop] = function() {
    return new ArrayWrap(
      Array.prototype[prop].apply(this.array, arguments)
    );
  }
}

ArrayWrap.prototype.mapDo = function(method) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this.map(function(element) {
    return element[method].apply(element, args);
  });
}
