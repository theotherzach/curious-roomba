describe("cell", function () {
  var cell, sdr = null;

  beforeEach(function () {
    var _activeCells = [];
    sdr = {
      activeCells: function () { return _activeCells; },
      predicted: function () {},
      setActiveCells: function(cells) { _activeCells = cells; }
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
    spyOn(sdr, "activeCells").andReturn(_(_.range(2000)).sample(40));
    cell.tick();
    expect(sdr.activeCells).toHaveBeenCalled();
  });

  it("uses a sample from the previous tick to reject a match", function () {
    sdr.setActiveCells(_(_.range(2000)).sample(40));
    cell.tick();

    sdr.setActiveCells(_(_.range(2000)).sample(40));
    expect(cell.isPatternMatching()).not.toBe(true);
  });

  it("uses a sample from the previous tick to accept a match", function () {
    sdr.setActiveCells(_(_.range(2000)).sample(40));
    cell.noise().tick().tick();
    // sdr.setActiveCells(_(_.range(2000)).sample(40));

    expect(cell.state()).toBe("on");
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
      expect(sdr.predicted).toHaveBeenCalledWith(cell);
    });

    it("gets bored with the same prediction", function () {
      cell.tick().tick()
      spyOn(sdr, "predicted");
      cell.tick().tick()
      expect(sdr.predicted).not.toHaveBeenCalled();
    });

    it("turns itself on if the harbingers are members of the set of active cells", function () {
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

    it("has a consistency of 0 prior to a successful prediction", function () {
      expect(cell.consistency()).toBe(0);
    });

    it("increments a consistency score for each successful match", function () {
      cell.tick();
      expect(cell.consistency()).toBe(1);
    });

    it("noise turns on a cell that has 0 consistency", function () {
      cell.noise();
      expect(cell.state()).toBe("on");
    });

    it("when noise turns on a cell, it is a new prediction", function () {
      cell.tick().tick();
      spyOn(sdr, "predicted");
      cell.noise().noise().tick().tick();
      expect(sdr.predicted).toHaveBeenCalled();
    });

    it("noise decrements positive consistency", function () {
      cell.tick().tick();
      expect(cell.consistency()).toBe(1);
      cell.noise();
      expect(cell.state()).toBe("off");
      expect(cell.consistency()).toBe(0);
    });

    xit("makes a prediction based on a sub-sample of the previously active cells", function () {
    });

    xit("successful predictions result in another cell transitioning to Expected on the next step.", function () {
    });
  });


});
