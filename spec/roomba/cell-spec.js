describe("A Cell", function () {
  var cell, neighborhood;
  beforeEach(function () {
    neighborhood = {
      activeCells: jasmine.createStub("activeCells").andReturn([1,2,3]),
    };
    cell = new Cell(neighborhood);
  });

  it("takes notice of other cells when activated", function () {
    cell.turnOn();
    expect(neighborhood.activeCells).toHaveBeenCalled();
  });

  it("predicts when it will be activated again by keeping an eye on some of the neighbors that were active last time", function(){
    cell.turnOn().turnOff();
  });

  it("slowly stops paying attention to neighbors that are unreliable");

  it("fires to the next level on successful predictions");
});
