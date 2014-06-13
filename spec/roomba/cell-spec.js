describe("cell", function () {
  var cell

  beforeEach(function () {
    cell = new Cell();
  });

  it("state is off by default", function () {
    expect(cell.state()).toBe("off");
  });

  it("can be turned on", function () {
    expect(cell.turnOn().state()).toBe("on");
  });

  xit("samples the previous step's SDR when on", function () {
  });

  xit("predicts whether it is about to turn on again.", function () {
  });

  xit("transitions to expected on subsequent succesful predictions", function () {
  });

  describe("predictions", function () {
    xit("makes a prediction based on a sub-sample of the previously active cells", function () {
    });

    xit("successful predictions result in another cell transitioning to Expected on the next step.", function () {
    });
  });

});
