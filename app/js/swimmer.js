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

          if (self.leftCell.state === "on") {
            self.leftCell.turnOff();
          } else if (self.rightCell.state === "on") {
            self.rightCell.turnOff();
          } else if (Math.random() > 0.5){
            self.leftCell.turnOn();
          } else {
            self.rightCell.turnOn();
          }

          self.environment.swim();
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
      var lumenLevels = [1000, 1100, 1200, 1300, 1400, 1500, 1600];

      var allLightLevelCells = lumenLevels.map(function(e) {
        return self.eye.cells[Math.round(e * 0.01)];
      });

      var previousIntensity = allLightLevelCells.filter(function(cell) {
        return cell.state === "on";
      }).length;

      var intensityCellIds = allLightLevelCells.filter(function(cell, index) {
        return lumens >= 1000 + ((index) * 100)
      }).map(function(cell) {
        return cell.id;
      });

      var currentIntensity = intensityCellIds.length;

      if (currentIntensity > previousIntensity) {
        // console.log("worst!")
      } else if (currentIntensity < previousIntensity) {
        // console.log("better!")
      } else {
        // console.log("equal")
      }

      if (lumens >= 1000) {
        cellIds.push(self.painCell.id);
      }

      self.eye.tickAll(cellIds.concat(intensityCellIds));
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
