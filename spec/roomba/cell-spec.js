describe("A Cell", function () {
  var cell, neighborhood;
  var Cell = importCell();

  beforeEach(function () {
    neighborhood = {
      activeLastStep: jasmine.createSpy("activeLastStep").andReturn([0,1,2,3,4]),
      isCellActive: jasmine.createSpy("isCellActive"),
    };
    cell = new Cell(neighborhood);
  });

  it("takes notice of other cells when activated", function () {
    cell.turnOn();
    expect(neighborhood.activeLastStep).toHaveBeenCalled();
  });

  it("predicts when it will be activated again by keeping an eye on some of the neighbors that were active last time", function(){
    neighborhood.isCellActive = function(id) {
      return true;
    }
    cell.turnOn().turnOff();
    cell.poll();

    expect(cell.predictive).toBe(true);
  });

  it("updates reliability markers even if it's not activated");

  it("slowly stops paying attention to neighbors that are unreliable");

  it("fires to the next level on successful predictions");
});
