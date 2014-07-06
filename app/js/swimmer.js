function importSwimmer() {
  "use strict";

  var Cell = null;
  var Neighborhood = null;

  function Swimmer(environment) {
    var self = this;
    if (!(self instanceof Swimmer)) { throw "Swimmer must be invoked with `new`"; }
    Cell = importCell();
    Neighborhood = importNeighborhood()

    self.eye = new Neighborhood(100);
    self.brain = new Neighborhood(100);
    self.motor = new Neighborhood(100);
    self.environment = environment;

    self.hardwire();
  }

  var proto = {
    hardwire: function() {
      var self = this;
      var painCell = self.eye.cells[1];

      Object.observe(painCell,function(events) {
        var cell = events[0].object
        if (cell.state !== "on") { return; }

        self.environment.swim();
      })


    },

    senseLight: function(lumens) {
      var self = this;

      var maxLumens = 1600;
      var cellIds = [];
      var painCell = self.eye.cells[1];
      var oneKCell = self.eye.cells[10];

      if (lumens >= 1600) { cellIds.push(self.eye.cells[16].id); }
      if (lumens >= 1500) { cellIds.push(self.eye.cells[15].id); }
      if (lumens >= 1400) { cellIds.push(self.eye.cells[14].id); }
      if (lumens >= 1300) { cellIds.push(self.eye.cells[13].id); }
      if (lumens >= 1200) { cellIds.push(self.eye.cells[12].id); }
      if (lumens >= 1100) { cellIds.push(self.eye.cells[11].id); }

      if (lumens >= 1000) {
        cellIds.push(painCell.id);
        cellIds.push(oneKCell.id);
      }

      self.eye.tickAll(cellIds);
      self.eye.pollAll();
      return self;
    },

    tick: function() {
      var self = this;

      self.senseLight(self.environment.lightLevel());


      return self;
    },

  };

  _(Swimmer.prototype).extend(proto);

  return Swimmer;
}
