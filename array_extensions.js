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
    var result = this.array[method] instanceof Function ?
      this.array[method].apply(this.array, arguments) :
      this.array[method];
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

ArrayWrap.prototype.lastIndex = function() {
  return this.length() - 1;
}

ArrayWrap.prototype.maxBy = function(callback) {
  var max;
  this.forEach(function(element) {
    var thisVal = callback.call(element);
    if(thisVal > max || typeof max === 'undefined') max = element;
  });
  return max;
}

ArrayWrap.prototype.max = function() {
  return Math.max.apply(null, this.array);
}

ArrayWrap.prototype.upTo = function(index) {
  return this.slice(0, index + 1);
}
