describe("Neighborhood", function () {
  var neighborhood;
  beforeEach(function () {
    neighborhood = new Neighborhood(100, Cell);
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
});
