// Game Of Life
$(function() {
  'use strict';
  var $gol = $('gol');
  if ($gol.length === 0) { return; }

  runGol();
});


// Sunny Ocean
$(function() {
  'use strict';
  var $sunnyOcean = $('sunnyocean');
  if ($sunnyOcean.length === 0) { return; }

  runSunnyOcean();
});
