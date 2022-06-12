function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  strokeWeight(10);
}

let x = 0;
let y = 0;
let updated = true;
let isInitial = true;
let initial_x = 0;
let initial_y = 0;

function draw() {
  push();
  translate(width / 2, height / 2);
  if (updated) {
    point(x, y);
    updated = false;
  }
  pop();
}

setInterval(() => {
  navigator.geolocation.getCurrentPosition(test2);
}, 3000);

function test2(position) {
  if (isInitial) {
    initial_x = position.coords.latitude;
    initial_y = position.coords.longitude;
  } else {
  }
  x = position.coords.latitude - initial_x;
  y = position.coords.longitude - initial_y;
  updated = true;
}
