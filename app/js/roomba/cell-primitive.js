function importCellPrimitive() {
  "use strict";

  function Cell() {
    var self = this;

    self.ACTIVE_CELL_RATIO = 0.02;
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
      var self = this;

      return self._connections;
    },

    inhibitorValue: function () {
      var self = this;
      if (_(self._neighboring).isEmpty()) { return 0; }

      var cellQty = Math.round(self._neighboring.length * self.ACTIVE_CELL_RATIO) || 1;

      var maxNeighbors = _(self._neighboring).sortBy(function(cell){
        return -cell.active();
      }).filter(function(cell, index) {
        return index < cellQty;
      });


      return _(maxNeighbors).last().active();
    },

  };

  _(Cell.prototype).extend(proto);

  return Cell;
}
