describe("Neighborhood", function () {
  var neighborhood;
  beforeEach(function () {
    var Neighborhood = importNeighborhood();
    neighborhood = new Neighborhood(100);
  });

  it("cells", function () {
    expect(neighborhood.cells.forEach).toBeDefined();
  });

  it("activeLastStep", function () {
    expect(neighborhood.activeLastStep().forEach).toBeDefined();
  });

  it("tickAll", function () {
    neighborhood.tickAll();
  });

  it("pollsAll", function () {
    neighborhood.tickAll();
    neighborhood.pollAll();
    neighborhood.tickAll();
    neighborhood.pollAll();
  });

  context("sequence memory", function () {
    var cell1, cell2, cell3, cell4;
    beforeEach(function () {
      cell1 = neighborhood.cells[0];
      cell2 = neighborhood.cells[1];
      cell3 = neighborhood.cells[2];
      cell4 = neighborhood.cells[3];
    });

    it("recalls basic sequence", function () {

      neighborhood.tickAll([cell1.id]);
      neighborhood.pollAll();
      neighborhood.tickAll([cell2.id]);
      neighborhood.pollAll();
      neighborhood.tickAll([cell3.id]);
      neighborhood.pollAll();



      neighborhood.tickAll([cell1.id]);
      neighborhood.pollAll();
      expect(cell2.predictive).toBe(true);
      expect(cell3.predictive).toBe(false);

      neighborhood.tickAll([cell2.id]);
      neighborhood.pollAll();
      expect(cell2.predictive).toBe(false);
      expect(cell3.predictive).toBe(true);

      neighborhood.tickAll([cell3.id]);
      neighborhood.pollAll();
    });
  });

});
