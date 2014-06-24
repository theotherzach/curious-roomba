function importCellPrimitive() {
  "use strict";

  function Cell() {
    var self = this;

    self.ACTIVE_CELL_RATIO = 0.02;
    self._feedForward = 0;
    self._inhibitorValue = 0;
    self._neighboring = [];
    self._connections = [];
  }

  var proto = {
    feedForward: function (value) {
      var self = this;

      self._feedForward = value;
      self.inhibit();

      return self;
    },

    active: function () {
      var self = this;

      if (self._feedForward >= self.inhibitorValue()) {
        return self._feedForward;
      } else {
        return 0;
      }

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

      return self._inhibitorValue;
    },

    inhibit: function () {
      var self = this;
      if (_(self._neighboring).isEmpty()) {
        self._inhibitorValue = 0;
        return self;
      }

      var cellQty = Math.round(self._neighboring.length * self.ACTIVE_CELL_RATIO) || 1;

      var maxNeighbors = _(self._neighboring).sortBy(function(cell){
        return -cell.active();
      }).filter(function(cell, index) {
        return index <= cellQty;
      });

      var weakestActiveNeighbor = _(maxNeighbors).last(2)[0];

      if (self._inhibitorValue !== weakestActiveNeighbor._feedForward) {
        self._inhibitorValue = weakestActiveNeighbor._feedForward;
        _(maxNeighbors).invoke("inhibit");
      }

      return self;
    },

  };

  _(Cell.prototype).extend(proto);

  return Cell;
}
