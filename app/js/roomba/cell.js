function Cell(neighborhood) {
  "use strict";
  var self = this;

  self.watchList = [];
  self.predictive = false;
  self.state = "off";
  self.id = makeGuid();
  self.cellsToWatch = [];

  self.turnOn = function () {
    self.state = "on";

    if (self.predictive) {
      console.log("Nailed it!");
    } else {
      self.cellsToWatch = neighborhood.activeLastStep();
    }

    return self;
  };

  self.poll = function () {
    var sampledCells = self.cellsToWatch.map(function(e, i) {
      return {
        id: e,
        active: neighborhood.isCellActive(e)
      };
    });

    self.predictive = predict(sampledCells);
    return self;
  };

  function predict(sampledCells) {
    return Math.random() < 0.2;
  }

  self.turnOff = function () {
    self.state = "off";
    return self;
  };

  self.turnPrevious = function () {
    self.state = "previous";
    return self;
  };

  self.tick = function(feedFwd) {
    if(feedFwd) {
      self.turnOn();
    } else if(self.state === "on") {
      self.turnPrevious();
    } else {
      self.turnOff();
    }

    return self;
  };

  return self;
}
