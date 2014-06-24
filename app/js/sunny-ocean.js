function runSunnyOcean() {
  "use strict";
  var viewportWidth = 960;
  var viewportHeight = 500;
  var baseRadius = Math.min(viewportHeight, viewportWidth);

  var el = d3.select('sunnyocean');

  var viewport = el.append('svg').
    attr('width', viewportWidth).
    attr('height', viewportHeight);


  var ocean = viewport.append("rect").
    attr("class", "ocean").
    attr("width", viewportWidth).
    attr("height", viewportHeight * 0.67).
    attr("y", viewportHeight * 0.33).
    style("fill", "rgba(71, 171, 192, 1.0)");

  var sky = viewport.append("rect").
    attr("class", "sky").
    attr("width", viewportWidth).
    attr("height", viewportHeight * 0.33).
    // style("fill", "rgba(20, 37, 116, 1.0)");
    style("fill", "rgba(126, 192, 238, 1.0)");

  var sunRadius = Math.round(baseRadius * 0.0625);
  var sunX = viewportWidth - (sunRadius * 3);
  var sunY = sunRadius * 2;

  viewport.append("circle").
    attr("class", "sun").
    attr("r", sunRadius).
    attr("cx", sunX).
    attr("cy", sunY).
    style("fill", "rgba(255, 204, 0, 1.0)");

  var cloud = viewport.append("ellipse").
    attr("class", "cloud").
    attr("rx", sunRadius * 2).
    attr("ry", sunRadius * 0.5).
    attr("cx", sunX).
    attr("cy", sunRadius * 4).
    style("fill", "rgba(255, 255, 255, 1.0)");

  var isCloudBlockingSun = true;

  function moveCloud() {
    if (isCloudBlockingSun) {
      cloud.transition().
        duration(1000).
        attr("cx", sunRadius * 3);
    } else {
      cloud.transition().
        duration(1000).
        attr("cx", sunX);
    }
    isCloudBlockingSun = !isCloudBlockingSun;
  }


  cloud.on("click", function(d, i) {
    moveCloud();
  })

}
