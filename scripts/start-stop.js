function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(0);
  if (walking_flag == 1) {
    background(0, 0, 255);
  } else if (walking_flag == 0) {
    background(255, 0, 0);
  }
}

let vibration = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let time = 0;
let walking_scalar = 1.0;
const top_threshold = 1.05;
const bottom_threshold = 0.95;
let walking_flag;

const elem = document.getElementById("innerHTMLtxt");

// setInterval(() => {
//   if (walking_flag == 1) {
//     elem.innerHTML = "歩行中";
//   } else if (walking_flag == 0) {
//     elem.innerHTML = "停止中";
//   }
// }, 100);

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
      if (
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
            0.000001) >
          top_threshold ||
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
            0.000001) <
          bottom_threshold
      ) {
        walking_flag = 1;
      } else {
        walking_flag = 0;
      }
      time = 0;
    }
  },
  true
);
