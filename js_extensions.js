_ = function(arg) {
  if(arg instanceof Array) return new ArrayWrap(arg);
}
