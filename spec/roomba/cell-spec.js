describe("A Cell", function () {
  var cell, neighborhood;
  beforeEach(function () {
    neighborhood = {
      activeLastStep: jasmine.createSpy("activeLastStep").andReturn([1,2,3]),
      isCellActive: jasmine.createSpy("isCellActive"),
      alertToOn: jasmine.createStub("alertToOn"),
      getId: jasmine.createStub("getId"),
    };
    cell = new Cell(neighborhood);
  });

  it("takes notice of other cells when activated", function () {
    cell.turnOn();
    expect(neighborhood.activeLastStep).toHaveBeenCalled();
  });

  it("predicts when it will be activated again by keeping an eye on some of the neighbors that were active last time", function(){
    cell.turnOn().turnOff();
    cell.tick(true).tick(false).tick(false)
  });

  it("updates reliability markers even if it's not activated");

  it("slowly stops paying attention to neighbors that are unreliable");

  it("fires to the next level on successful predictions");
});
