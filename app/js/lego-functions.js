function toArray(obj) {
  return Array.prototype.slice.call(obj);
}

function curry(fn) {
  "use strict";
  var args = Array.prototype.slice.call(arguments, 1);
  function f() { return fn.apply(this, args.concat(toArray(arguments))); }
  return f;
}

function autoCurry(fn, numArgs) {
  "use strict";
  numArgs = numArgs || fn.length;
  function f() {
    if (arguments.length < numArgs)
      {
        return numArgs - arguments.length > 0 ?
          autoCurry(curry.apply(this, [fn].concat(toArray(arguments))),
                    numArgs - arguments.length) :
                      curry.apply(this, [fn].concat(toArray(arguments)));
      }
      else
        {
          return fn.apply(this, arguments);
        }
  }
  f.toString = function() { return fn.toString(); };
  f.curried = true;
  return f;
}

// Function.prototype.autoCurry = autoCurry;

(function(root) {
  "use strict";
  root.dot = autoCurry(function(prop, obj) {
    return obj[prop];
  });
})(this);

