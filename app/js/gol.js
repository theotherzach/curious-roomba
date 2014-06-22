function runGol() {
  var viewportWidth = 960;
  var viewportHeight = 500;
  var cellSide = 8;
  var xCellQty = Math.round(viewportWidth / cellSide);
  var yCellQty = Math.round(viewportHeight / cellSide);

  if (isNaN(xCellQty)) { throw "invalid xCellQty"; }
  if (isNaN(yCellQty)) { throw "invalid yCellQty"; }

  var xScale = d3.scale.linear().domain([0, xCellQty]).rangeRound([0, xCellQty * cellSide]);
  var yScale = d3.scale.linear().domain([0, yCellQty]).rangeRound([0, yCellQty * cellSide]);


  var gridSize = yCellQty * xCellQty;
  var states = _.range(gridSize).map(function() { return false; });

  var _xYMemo = {};

  function parseXY(x, y) {
    return _xYMemo[x +','+ y] ||
      (_xYMemo[x +','+ y] = xCellQty * ((yCellQty + y) % yCellQty) + ((xCellQty + x) % xCellQty));
  }

  function setRandomStates() {
    states.forEach(function(e, i) {
      states[i] = Math.random() < 0.2;
    });
  }

  var viewport = d3.select('gol').append('svg:svg').
    attr('width', viewportWidth).
    attr('height', viewportHeight);

  function createNewGeneration() {
    var index, x, y, top, right, bottom, left, n, nextStates = [];
    for (x = 0; x < xCellQty; x++) {
      left = x - 1;
      right = x + 1;
      for (y = 0; y < yCellQty; y++) {
        index = parseXY(x,y);
        top = y - 1;
        bottom = y + 1;
        n = states[parseXY(left,top)] + states[parseXY(x,top)] + states[parseXY(right,top)] +
          states[parseXY(left,y)] +                      states[parseXY(right,y)] +
          states[parseXY(left,bottom)] + states[parseXY(x,bottom)] + states[parseXY(right,bottom)];

        nextStates[index] = states[index] ? n ===  2 || n ===  3 : n ===  3;
      }
    }
    return nextStates;
  }

  setRandomStates();

  viewport.selectAll('rect').
    data(states).
    enter().
    append('svg:rect').
    attr('width', cellSide).
    attr('height', cellSide).
    attr('x', function(e, i) { return xScale(i % xCellQty); }).
    attr('y', function(e, i) { return yScale(i / xCellQty | 0); }).
    classed('life', function(e) { return e; });

  function animate() {
    d3.selectAll('rect')
    .data(states = createNewGeneration())
    .classed('life', function(d) { return d; });

    // requestAnimationFrame(function() {
    requestAnimationFrame(animate);
    // });
  }


  animate();
}
