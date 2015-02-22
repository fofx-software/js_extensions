if(typeof _ === 'undefined') {
  _ = function(arg) {
    if(arg instanceof Array) return new ArrayWrap(arg);
  }
}

function ArrayWrap(array) {
  this.array = array;
  for(var i = 0; i < array.length; i++) {
    this[i] = array[i];
  }
}

Object.getOwnPropertyNames(Array.prototype).forEach(function(method) {
  ArrayWrap.prototype[method] = function() {
    var result = Array.prototype[method].apply(this.array, arguments)
    return(
      result instanceof Array ? new ArrayWrap(result) : result
    );
  }
});

ArrayWrap.prototype.mapDo = function(method) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this.map(function(element) {
    return element[method].apply(element, args);
  });
}
