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

    self.painCell = self.eye.cells[1];
    self.fwdCell = self.motor.cells[1];

    self.hardwire();
  }

  var proto = {
    hardwire: function() {
      var self = this;
      self.leftCell = self.motor.cells[10];
      self.rightCell = self.motor.cells[20];

      Object.observe(self.painCell,function(events) {
        var cell = events[0].object
        if (cell.state === "on") {
          self.fwdCell.turnOn();
        }
        else {
          self.fwdCell.turnOff();
        }
      });

      Object.observe(self.fwdCell, function(events) {
        if (events[0].object.state === "on") {
          self.environment.swim();

          if (self.leftCell.state === "on") {
            self.leftCell.turnOff();
          } else if (self.rightCell.state === "on") {
            self.rightCell.turnOff();
          } else if (Math.random() > 0.5){
            self.leftCell.turnOn();
          } else {
            self.rightCell.turnOn();
          }
        }
      });

      Object.observe(self.leftCell, function(events) {
        if (events[0].object.state === "on") {
          self.environment.turn("left", 45);
        }
      });

      Object.observe(self.rightCell, function(events) {
        if (events[0].object.state === "on") {
          self.environment.turn("right", 45);
        }
      });

    },

    move: function() {
      var self = this;
      if (self.fwdCell.state === "on") {
        self.environment.swim();
      }
    },

    senseLight: function(lumens) {
      var self = this;

      var maxLumens = 1600;
      var cellIds = [];
      var oneKCell = self.eye.cells[10];

      if (lumens >= 1600) { cellIds.push(self.eye.cells[16].id); }
      if (lumens >= 1500) { cellIds.push(self.eye.cells[15].id); }
      if (lumens >= 1400) { cellIds.push(self.eye.cells[14].id); }
      if (lumens >= 1300) { cellIds.push(self.eye.cells[13].id); }
      if (lumens >= 1200) { cellIds.push(self.eye.cells[12].id); }
      if (lumens >= 1100) { cellIds.push(self.eye.cells[11].id); }

      if (lumens >= 1000) {
        cellIds.push(self.painCell.id);
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
