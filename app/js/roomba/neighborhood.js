function importNeighborhood() {
  "use strict";
  var Cell = importCell();

  function Neighborhood(size) {
    var self = this;
    if (!(self instanceof Neighborhood)) { throw "Neighborhood must be invoked with `new`"; }

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

    tickAll: function() {
      var self = this;
      self.cells.forEach(function(cell) {
        cell.tick(Math.random() < 0.2);
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
