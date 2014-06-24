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
    Given -> cells = _(10).times(-> new Cell()).concat(cell)
    When -> cells.forEach (cell) ->
      cell.attachLateral(cells)

    Then ->
      cells[0].feedForward(50)
      expect(cells[0].active()).toBe(50)

    Then ->
      cells[0].feedForward(52)
      cell.inhibit()
      expect(cell.inhibitorValue()).toBe(52)

    Then ->
      cells[1].feedForward(51)
      cells[0].feedForward(50)
      cell.inhibit()
      expect(cell.inhibitorValue()).toBe(51)

    Then ->
      cells[0].feedForward(102)
      cell.feedForward(98)
      expect(cell.inhibitorValue()).toBe(102)

    Then ->
      cells[0].feedForward(99)
      cell.feedForward(103)
      expect(cell.active()).toBe(103)

    Then ->
      cells[0].feedForward(101)
      cell.feedForward(89)
      expect(cell.active()).toBe(0)

    Then ->
      cell.feedForward(100)
      cells[0].feedForward(200)
      expect(cell.active()).toBe(0)

    Then ->
      cells[0].feedForward(50)
      expect(cell.activeNeighbors(50)).toContain(cells[0])
    # Then ->
    #   cells[0].feedForward(50)
    #   cell.feedForward(100)
    #   expect(cell.connections()).toContain(cells[0])
