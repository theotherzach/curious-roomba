function importNeighborhood() {
  "use strict";
  var Cell = null;

  function Neighborhood(size) {
    var self = this;
    if (!(self instanceof Neighborhood)) { throw "Neighborhood must be invoked with `new`"; }

    Cell = importCell();

    self.cells = _(size).times(function(i) {
      return new Cell(self);
    });
  }


  var proto = {

    activeLastStep: function() {
      var self = this;
      return self.cells.filter(function(e, i) {
        return e.state === "previous";
      }).map(function(e) {
        return e.id;
      });
    },

    isCellActive: function(cellId) {
      var self = this;
      var cell = _(self.cells).find(function(e) {
        return e.id === cellId;
      });
      return cell.state === "on";
    },

    isCellPredictive: function(cellId) {
      var self = this;
      var cell = _(self.cells).find(function(e) {
        return e.id === cellId;
      });
      return cell.predictive;
    },

    tickAll: function(cellIds) {
      var self = this;
      self.cells.forEach(function(cell) {
        cell.tick(_(cellIds).contains(cell.id));
      });
      return self;
    },

    pollAll: function() {
      var self = this;
      self.cells.forEach(function(cell) {
        cell.poll();
      });
      return self;
    },
  };


  _(Neighborhood.prototype).extend(proto);

  return Neighborhood;
}
