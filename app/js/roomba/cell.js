function importCell() {
  "use strict";
  var guid = null;

  function Cell (neighborhood) {
    var self = this;
    if (!(self instanceof Cell)) { throw "Cell must be invoked with `new`"; }

    guid = importGuid();

    self.neighborhood = neighborhood;
    self.watchList = [];
    self.predictive = false;
    self.state = "off";
    self.id = guid.make();
    self.cellsToWatch = [];
  }

  var proto = {

    turnOn: function () {
      var self = this;
      self.state = "on";
      if (self.predictive) {
        console.log("Nailed it!");
      } else {
        self.cellsToWatch = self.neighborhood.activeLastStep();
      }
      return self;
    },

    poll: function () {
      var self = this;
      var sampledCells = self.cellsToWatch.map(function(e, i) {
        return self.neighborhood.isCellActive(e);
      });
      self.predictive = predict(sampledCells);
      return self;
    },

    turnOff: function () {
      var self = this;
      self.state = "off";
      return self;
    },

    turnPrevious: function () {
      var self = this;
      self.state = "previous";
      return self;
    },

    tick: function(feedFwd) {
      var self = this;
      if(feedFwd) {
        self.turnOn();
      } else if(self.state === "on") {
        self.turnPrevious();
      } else if(Math.random < 0.1) {
        self.turnOn();
      } else {
        self.turnOff();
      }
      return self;
    },
  };

  function predict(sampledCells) {
    var max = sampledCells.length;
    if (max === 0) { return false; }

    var matches = sampledCells.reduce(function(memo, e) {
      return memo + e;
    });
    var score = matches / max;

    if (!isFinite(score)) { throw "Bad score"; }
    return score >= 0.8;
  }


  _(Cell.prototype).extend(proto);

  return Cell;
}
