let vibration = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let vibration_ratio_value = 0;
let time = 0;
let walking_scalar = 1.0;
let top_threshold = 1.05;
let bottom_threshold = 0.95;
let walking_flag;

const elem = document.getElementById("innerHTMLtxt");

const top_threshold_value = document.getElementById("topThresholdValue");
const bottom_threshold_value = document.getElementById("bottomThresholdValue");
const top_threshold_slider = document.getElementById("topThresholdSlider");
const bottom_threshold_slider = document.getElementById(
  "bottomThresholdSlider"
);
const vibration_ratio = document.getElementById("vibrationRatio");

setInterval(() => {
  if (walking_flag == 1) {
    elem.style.backgroundColor = "#0000ff";
  } else if (walking_flag == 0) {
    elem.style.backgroundColor = "#ff0000";
  } else {
    elem.style.backgroundColor = "#dddddd";
  }
  top_threshold_value.innerHTML = top_threshold_slider.value / 100;
  bottom_threshold_value.innerHTML = bottom_threshold_slider.value / 100;
  top_threshold = top_threshold_slider.value / 100;
  bottom_threshold = bottom_threshold_slider.value / 100;
  vibration_ratio.innerHTML = vibration_ratio_value;
}, 100);

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
        walking_flag = 1;
      } else {
        walking_flag = 0;
      }
      time = 0;
    }
  },
  true
);
