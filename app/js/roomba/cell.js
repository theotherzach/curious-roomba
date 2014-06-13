function Cell(sdr) {
  "use strict";
  var self = this;
  var _state = "off";
  var _harbingers = [];
  var _isNewPrediction = false;

  function tick() {
    if (_state === "on") {
      turnOff();
    } else if (_(_harbingers).union(sdr.activeCells()).length == sdr.activeCells().length) {

      if (_harbingers.length > 0) {

        if (_isNewPrediction) {
          sdr.predicted(self);
          _isNewPrediction = false;
        }

      turnOn();
      }
    }

    return self;
  }

  function state() {
    return _state;
  }

  function turnOn() {

    _state = "on";

    if (_harbingers.length === 0 ) {
      _harbingers = _(sdr.activeCells()).sample(10);
      _isNewPrediction = true;
    }

    return self;
  }

  function turnOff() {
    _state = "off";
    return self;
  }

  self.tick = tick;
  self.turnOff = turnOff;
  self.turnOn = turnOn;
  self.state = state;
  return self;
}
