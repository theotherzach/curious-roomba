function Cell(sdr) {
  "use strict";
  var self = this;

  var _state = "off";
  var _harbingers = [];
  var _isNewPrediction = false;
  var _consistency = 0;

  function tick() {
    if (_state === "on") {
      turnOff();
    } else if (isPatternMatching()) {

      _consistency++;

      if (_isNewPrediction) {
        sdr.predicted(self);
        _isNewPrediction = false;
      }

      turnOn();
    } else if (isRandomFire()) {
      noise();
    }

    return self;
  }

  function noise() {
    if (_consistency == 0) {
      _harbingers = [];
      turnOn();
    } else {
      _consistency--;
    }

    return self;
  }

  function isRandomFire() {
    return Math.random() <= 0.001;
  }

  function state() {
    return _state;
  }

  function turnOn() {

    _state = "on";

    if (harbingerFree()) {
      _isNewPrediction = true;
    }

    if (isWhiteNoise()) {
      _harbingers = _(sdr.activeCells()).sample(10);
    }

    return self;
  }

  function turnOff() {
    _state = "off";
    return self;
  }

  function isWhiteNoise() {
    return !isPatternMatching();
  }

  function isPatternMatching() {
    if (harbingerFree()) {
      return false;
    } else {
      return _(_harbingers).union(sdr.activeCells()).length == sdr.activeCells().length;
    }
  }

  function harbingerFree() {
    return !hasHarbingers();
  }

  function hasHarbingers() {
    return _harbingers.length > 0;
  }

  function consistency() {
    return _consistency;
  }

  self.noise = noise;
  self.consistency = consistency;
  self.tick = tick;
  self.turnOff = turnOff;
  self.turnOn = turnOn;
  self.state = state;
  return self;
}
