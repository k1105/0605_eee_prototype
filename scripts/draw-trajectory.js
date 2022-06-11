function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  strokeWeight(10);
}

function draw() {
  background(255);
  push();
  translate(width / 2, height / 2);
  point(latest_x, latest_y);
  pop();
}

let vibration = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let vibration_ratio_value = 0;
let time = 0;
let walking_scalar = 1.0;
let alpha = 0,
  beta = 0,
  gamma = 0;
let latest_x = 0,
  latest_y = 0;
const top_threshold = 1.15;
const bottom_threshold = 0.85;
let walking_flag;
const walking_flags = new Array(5).fill(0);

const elem = document.getElementById("innerHTMLtxt");

setInterval(() => {
  /* walking_flagの決定 */
  let sum = 0;
  for (let i = 0; i < walking_flags.length; i++) {
    sum += walking_flags[i];
  }

  if (sum > 2) {
    walking_flag = 1;
  } else {
    walking_flag = 0;
  }

  /* walking_flagの決定 終了 */

  if (walking_flag == 1) {
    latest_x +=
      walking_scalar * Math.cos((-1 * alpha.toFixed(1) * Math.PI) / 180);
    latest_y +=
      walking_scalar * Math.sin((-1 * alpha.toFixed(1) * Math.PI) / 180);
  }
}, 100);

window.addEventListener(
  "deviceorientation",
  function (orientation_event) {
    alpha = orientation_event.alpha;
    beta = orientation_event.beta;
    gamma = orientation_event.gamma;
  },
  true
);

window.addEventListener(
  "devicemotion",
  function (motion_event) {
    let x = motion_event.accelerationIncludingGravity.x;
    let y = motion_event.accelerationIncludingGravity.y;
    let z = motion_event.accelerationIncludingGravity.z;

    if (
      typeof x !== "undefined" &&
      typeof y !== "undefined" &&
      typeof z !== "undefined"
    ) {
      vibration[time] = Math.pow(x * x + y * y + z * z, 2);
      time++;
    }

    if (time > 9) {
      vibration_ratio_value =
        (vibration[0] +
          vibration[1] +
          vibration[2] +
          vibration[3] +
          vibration[4]) /
        (vibration[5] +
          vibration[6] +
          vibration[7] +
          vibration[8] +
          vibration[9] +
          0.000001);
      if (
        vibration_ratio_value > top_threshold ||
        vibration_ratio_value < bottom_threshold
      ) {
        walking_flags.push(1);
      } else {
        walking_flags.push(0);
      }
      walking_flags.shift();
      time = 0;
    }
  },
  true
);
