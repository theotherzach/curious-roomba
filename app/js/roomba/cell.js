function Cell(neighborhood) {
  "use strict";
  var self = this;

  self.watchList = [];
  self.predictive = false;
  self.state = "off";
  self.id = makeGuid();

  neighborhood.register(self);


  self.turnOn = function () {
    self.state = "on";

    neighborhood.alertToOn(self);

    if (self.predictive) {
    } else {
      var activeCells = neighborhood.activeLastStep();
      neighborhood.watch(activeCells, function (cellIds) {
        self.poll(cellIds);
      });
    }

    return self;
  };

  self.poll = function (cellIds) {
    var sampledCells = cellIds.map(function(e, i) {
      return {
        id: e,
        active: neighborhood.isCellActive(e)
      };
    });

    predictive = predict(sampledCells);
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
