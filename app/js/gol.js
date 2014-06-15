var viewportWidth = 960;
var viewportHeight = 500;
var cellSide = 8;
var xCellQty = Math.round(viewportWidth / cellSide);
var yCellQty = Math.round(viewportHeight / cellSide);
var xScale = d3.scale.linear().domain([0, xCellQty]).rangeRound([0, xCellQty * cellSide])
var yScale = d3.scale.linear().domain([0, yCellQty]).rangeRound([0, yCellQty * cellSide])

if (!(xCellQty && yCellQty)) { throw "invalid grid size" }

var gridSize = yCellQty * xCellQty;
var states = _.range(gridSize).map(function() { return false; });

function setRandomStates() {
  states.forEach(function(e, i) {
    states[i] = Math.random() < .2;
  });
}

var viewport = d3.select('body').append('svg:svg').
  attr('width', viewportWidth).
  attr('height', viewportHeight);

setRandomStates();

viewport.selectAll('rect').
  data(states).
  enter().
  append('svg:rect').
  attr('width', cellSide).
  attr('height', cellSide).
  attr('x', function(e, i) { return  xScale(i % xCellQty); }).
  attr('y', function(e, i) { return yScale(i / xCellQty | 0); }).
  classed('life', function(e) { return e; });
