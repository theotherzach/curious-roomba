function importCellPrimitive() {
  "use strict";

  function Cell() {
  }

  var proto = {
    feedForward: function (value) {
      var self = this;

      self.active = value;
      return self;
    },
  };

  _(Cell.prototype).extend(proto);

  return Cell;
}
