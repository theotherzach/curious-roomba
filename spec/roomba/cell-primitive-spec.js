function importCellPrimitive() {
  "use strict";

  function Cell() {
    var self = this;

    self._feedForward = 0;
    self._neighboring = [];
    self._connections = [];
  }

  var proto = {
    feedForward: function (value) {
      var self = this;

      if(value > self.inhibitorValue()) {
        self._feedForward = value;
      } else {
        self._feedForward = 0;
      }
      return self;
    },

    active: function () {
      var self = this;

      return self._feedForward;
    },

    activeNeighbors: function (value) {
      var self = this;

      return self._neighboring.filter(function(cell) {
        return cell.active() >= value;
      });
    },

    attachLateral: function (cells) {
      var self = this;

      self._neighboring = cells;

      return self;
    },

    connections: function () {
    },

    inhibitorValue: function () {
      var self = this;
      var maxNeighbor = _(self._neighboring).max(function(cell){
        return cell.active();
      });

      if (_(maxNeighbor).isObject()) {
        return maxNeighbor.active();
      } else {
        return 0;
      }
    },

  };

  _(Cell.prototype).extend(proto);

  return Cell;
}
