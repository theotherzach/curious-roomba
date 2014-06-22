describe "A Cell", ->
  Cell = importCellPrimitive()
  cell = null
  Given -> 
    cell = new Cell()

  context "when receiving feed fwd imput", ->
    Given -> cell.feedForward(100)
    Then -> expect(cell.active()).toBe(100)

  context "when connected to other cells", ->
    cells = null
    Given -> cells = _(10).times(-> new Cell())
    When -> cell.attachLateral(cells)
    Then ->
      cells[0].feedForward(50)
      expect(cell.inhibitorValue()).toBe(50)
    Then ->
      cells[0].feedForward(100)
      cell.feedForward(99)
      expect(cell.active()).toBe(0)
    Then ->
      cells[0].feedForward(50)
      expect(cell.activeNeighbors(50)).toContain(cells[0])
    # Then ->
    #   cells[0].feedForward(50)
    #   cell.feedForward(100)
    #   expect(cell.connections()).toContain(cells[0])
