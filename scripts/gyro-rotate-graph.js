function setup() {
  //キャンバスを作成
  createCanvas(window.windowWidth, window.windowHeight);
  //背景色
  //オブジェクトの色
  noFill();
  strokeWeight(10);
}

function draw() {
  //notify death

  background(255);
  for (let i = 0; i < 100; i++) {
    point(i * 10, 200 - xs[i]);
    point(i * 10, 300 - ys[i]);
    point(i * 10, 400 - zs[i]);
    point(i * 10, 500 - x_orientations[i]);
    point(i * 10, 600 - y_orientations[i]);
    point(i * 10, 700 - z_orientations[i]);
    point(i * 10, 800 - x_degrees[i]);
    point(i * 10, 900 - y_degrees[i]);
    point(i * 10, 1000 - z_degrees[i]);
  }
}

const elem = document.getElementById("innerHTMLtxt");
let x,
  y,
  z,
  x_orientation,
  y_orientation,
  z_orientation,
  x_degree,
  y_degree,
  z_degree;

let t = 0;

const xs = new Array(100).fill(0);
const ys = new Array(100).fill(0);
const zs = new Array(100).fill(0);
const x_orientations = new Array(100).fill(0);
const y_orientations = new Array(100).fill(0);
const z_orientations = new Array(100).fill(0);
const x_degrees = new Array(100).fill(0);
const y_degrees = new Array(100).fill(0);
const z_degrees = new Array(100).fill(0);

window.addEventListener(
  "devicemotion",
  function (motion_event) {
    x = motion_event.accelerationIncludingGravity.x;
    y = motion_event.accelerationIncludingGravity.y;
    z = motion_event.accelerationIncludingGravity.z;
  },
  true
);

window.addEventListener(
  "deviceorientation",
  function (orientation_event) {
    z_orientation = orientation_event.alpha;
    x_orientation = orientation_event.beta;
    y_orientation = orientation_event.gamma;

    z_degree = (z_orientation.toFixed(1) * Math.PI) / 180;
    x_degree = (x_orientation.toFixed(1) * Math.PI) / 180;
    y_degree = (y_orientation.toFixed(1) * Math.PI) / 180;
  },
  true
);

setInterval(() => {
  if (typeof x !== "undefined") {
    xs.push(x);
    xs.shift();
  }
  if (typeof y !== "undefined") {
    ys.shift();
    ys.push(y);
  }
  if (typeof z !== "undefined") {
    zs.shift();
    zs.push(z);
  }

  if (typeof x_orientation !== "undefined") {
    x_orientations.shift();
    x_orientations.push(x_orientation);
  }
  if (typeof y_orientation !== "undefined") {
    y_orientations.shift();
    y_orientations.push(y_orientation);
  }
  if (typeof z_orientation !== "undefined") {
    z_orientations.shift();
    z_orientations.push(z_orientation);
  }

  if (typeof x_degree !== "undefined") {
    x_degrees.shift();
    x_degrees.push(x_degree);
  }
  if (typeof y_degree !== "undefined") {
    y_degrees.shift();
    y_degrees.push(y_degree);
  }
  if (typeof z_degree !== "undefined") {
    z_degrees.shift();
    z_degrees.push(z_degree);
  }

  // elem.innerHTML =
  //   "acceleration_x: " +
  //   x +
  //   " <br />" +
  //   "acceleratio_y: " +
  //   y +
  //   " <br />" +
  //   "acceleration_z: " +
  //   z +
  //   " <br />" +
  //   "x_orientation: " +
  //   x_orientation +
  //   "<br />" +
  //   "y_orientation: " +
  //   y_orientation +
  //   "<br />" +
  //   "z_orientation: " +
  //   z_orientation +
  //   "<br />" +
  //   "x_degree: " +
  //   x_degree +
  //   "<br />" +
  //   "y_degree: " +
  //   y_degree +
  //   "<br />" +
  //   "z_degree: " +
  //   z_degree +
  //   "<br />";
}, 10);
