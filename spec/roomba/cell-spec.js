describe("cell", function () {
  var cell, sdr = null;

  beforeEach(function () {
    sdr = {
      activeCells: function () { return []; },
      predicted: function () {}
    }

    cell = new Cell(sdr);
  });

  it("state is off by default", function () {
    expect(cell.state()).toBe("off");
  });

  it("can be turned on", function () {
    expect(cell.turnOn().state()).toBe("on");
  });

  it("checks the previous step's SDR when on", function () {
    spyOn(sdr, "activeCells").andReturn(_(_.range(200)).sample(40));
    cell.turnOn();
    expect(sdr.activeCells).toHaveBeenCalled();
  });

  describe("predictions", function () {
    beforeEach(function () {
      spyOn(sdr, "activeCells").andReturn(_(_.range(2000)).sample(40));
      cell.turnOn().tick();
    });

    it("starts at OFF", function () {
      expect(cell.state()).toBe("off");
    });

    it("predicts whether it is about to turn on again.", function () {
      spyOn(sdr, "predicted");
      cell.tick();
      expect(sdr.predicted).toHaveBeenCalled();
    });

    it("gets bored with the same prediction", function () {
      cell.tick().tick()
      spyOn(sdr, "predicted");
      cell.tick().tick()
      expect(sdr.predicted).not.toHaveBeenCalled();
    });

    it("turns itself on if the conditions are right", function () {
      cell.tick();
      expect(cell.state()).toBe("on");
    });

    it("stays off when the pattern is new", function () {
      sdr.activeCells = function () { };
      spyOn(sdr, "activeCells").andReturn(_(_.range(2000)).sample(40));
      cell.tick();
      expect(cell.state()).toBe("off");
      cell.tick();
      expect(cell.state()).toBe("off");
    });

    xit("makes a prediction based on a sub-sample of the previously active cells", function () {
    });

    xit("successful predictions result in another cell transitioning to Expected on the next step.", function () {
    });
  });

});
