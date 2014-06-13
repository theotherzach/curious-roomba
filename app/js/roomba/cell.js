function Cell() {
  "use strict";
  var self = this;
  var _state = "off";

  function state() {
    return _state;
  }

  function turnOn() {
    _state = "on";
    return self;
  }

  function turnOff() {
    _state = "off";
    return self;
  }

  self.turnOff = turnOff;
  self.turnOn = turnOn;
  self.state = state;
  return self;
}
