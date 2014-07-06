function runSunnyOcean() {
  "use strict";
  var viewportWidth = 960;
  var viewportHeight = 500;
  var baseRadius = Math.min(viewportHeight, viewportWidth);

  var el = d3.select('sunnyocean');

  var viewport = el.append('svg').
    attr('width', viewportWidth).
    attr('height', viewportHeight);

  var oceanY = viewportHeight * 0.33;
  var oceanHeight = viewportHeight * 0.67;

  var ocean = viewport.append("rect").
    attr("class", "ocean").
    attr("width", viewportWidth).
    attr("height", oceanHeight).
    attr("y", oceanY).
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

  var swimmerRadius = Math.round(baseRadius * 0.00625);
  var swimmerX = viewportWidth - (swimmerRadius * 30);
  var swimmerY = oceanY + swimmerRadius * 2

  var swimmerSVG = viewport.append("ellipse").
    attr("class", "swimmer").
    attr("rx", swimmerRadius * 0.5).
    attr("ry", swimmerRadius * 2).
    attr("cx", swimmerX).
    attr("cy", swimmerY).
    style("fill", "rgba(8, 8, 8, 1.0)");

  function moveSwimmer(swimmerSVG, x, y) {
    swimmerSVG.transition().
      duration(980).
      attr("cx", x).
      attr("cy", y);
  }

  function Environment(swimmerX, swimmerY) {
    var self = this;
    var x = swimmerX;
    var y = swimmerY;
    var degrees = 90;
    var velocity = 10;

    function toRadians(degrees) {
      return degrees / (180/Math.PI);
    }

    self.lightLevel = function() {
      var baseLight;
      if (isCloudBlockingSun) {
        baseLight = 800;
      } else {
        baseLight = 1400;
      }
      var depthMod = 1 - (y - oceanY) / oceanHeight
      return depthMod * baseLight;
    };

    self.turn = function(direction, deg) {
      if (direction === "left") {
        degrees += deg
      } else if (direction === "right") {
        degrees -= deg
      }
      return self;
    };

    self.swim = function() {
      var yMod = Math.sin(toRadians(degrees)) * velocity;
      var xMod = Math.cos(toRadians(degrees)) * velocity;
      y += yMod;
      x += xMod;
      moveSwimmer(swimmerSVG, x, y);

    }
  }

  var Swimmer = importSwimmer();
  var environment = new Environment(swimmerX, swimmerY);
  var swimmer = new Swimmer(environment);

  setInterval(function() {
    swimmer.tick();
  }, 1000);

}
