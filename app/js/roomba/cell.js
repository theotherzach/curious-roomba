function Cell(neighborhood) {
  "use strict";
  var self = this;

  self.watchList = [];

  self.turnOn = function () {
    neighborhood.activeCells();

    return self;
  };

  self.turnOff = function () {
    return self;
  };

  return self;
}
