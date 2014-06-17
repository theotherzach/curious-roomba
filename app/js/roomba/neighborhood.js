function Neighborhood(size, CellConstructor) {
  "use strict";
  var self = this;

  var Cell = CellConstructor || Cell;

  self.cells = _(size).times(function(i) {
    return new Cell(self);
  });

  self.activeLastStep = function() {
    return self.cells.filter(function(e, i) {
      return e.state === "previous";
    }).map(function(e) {
      return e.id;
    });
  };

  self.isCellActive = function(cellId) {
    var cell = _(self.cells).find(function(e) {
      return e.id === cellId;
    });

    return cell.state === "on";
  };

  self.tickAll = function() {
    self.cells.forEach(function(cell) {
      cell.tick(Math.random() < 0.2);
    });

    return self;
  }

  self.pollAll = function() {
    self.cells.forEach(function(cell) {
      cell.poll();
    });

    return self;
  }

  return self;
}
