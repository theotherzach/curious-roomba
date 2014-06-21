describe "A Cell", ->
  Cell = importCellPrimitive()
  cell = null
  Given -> cell = new Cell()

  context "when receiving feed fwd imput", ->
    Given -> cell.feedForward(100)
    Then -> expect(cell.active).toBe(100)

