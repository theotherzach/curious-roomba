function importSwimmer() {
  "use strict";

  var Cell = null;
  var Neighborhood = null;

  function Swimmer() {
    var self = this;
    if (!(self instanceof Swimmer)) { throw "Swimmer must be invoked with `new`"; }
    Cell = importCell();
    Neighborhood = importNeighborhood()

    self.eye = new Neighborhood(100);
    self.brain = new Neighborhood(100);
    self.motor = new Neighborhood(100);
  }

  var proto = {
    senseLight: function(lumens) {
      var self = this;

      var maxLumens = 1600;
      var lightRatio = lumens / maxLumens;
      var eyeSize = self.eye.cells.length;
      var eyeSections = Math.round(eyeSize / 4)
      if (!lightRatio) { throw "invalid lumen level" }

      var cellIds = _(4).times(function(i) {
        var cellIndex = (i * eyeSections) + Math.round(eyeSections * lightRatio);
        var cell = self.eye.cells[cellIndex];

        if (!cell) { throw "invalid cell index" }

        return cell;
      }).map(function(cell) {
        return cell.id;
      });

      self.eye.tickAll(cellIds);
      self.eye.pollAll();
      return cellIds;
    },
  };

  _(Swimmer.prototype).extend(proto);

  return Swimmer;
}
