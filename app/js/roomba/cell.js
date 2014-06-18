function importCell() {
  "use strict";
  var guid = importGuid();

  function Cell (neighborhood) {
    var self = this;
    self.neighborhood = neighborhood;
    self.watchList = [];
    self.predictive = false;
    self.state = "off";
    self.id = guid.make();
    self.cellsToWatch = [];
  }

  function predict(sampledCells) {
    return Math.random() < 0.2;
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
        return {
          id: e,
          active: self.neighborhood.isCellActive(e)
        };
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
      } else {
        self.turnOff();
      }
      return self;
    },
  };

  _(Cell.prototype).extend(proto);

  return Cell;
}
