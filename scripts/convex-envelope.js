function setup() {
  //キャンバスを作成
  createCanvas(window.windowWidth, window.windowHeight);
  //背景色
  //オブジェクトの色
  noFill();
  strokeWeight(10);
  //キャンバスの中心に直径100pxの丸を描画
  //ellipse(width / 2, height / 2, 100);
  for (let theta = 0; theta < 2 * Math.PI; theta += (2 * Math.PI) / num) {
    points.push(new Point(100, theta));
    deltas.push(0);
  }
}

function draw() {
  //notify death

  background(
    255 * (length / 1000) ** 3,
    255 * (length / 1000) ** 3,
    255 * (length / 1000) ** 3
  );

  push();

  if (length < 500) {
    vector = 1;
  }

  if (length > 1500) {
    vector = -1;
  }

  let angle = -1;
  if (typeof alpha !== "undefined") {
    angle = floor((alpha + 180 / num) / (360 / num)) % num;
    angle = (((num - angle) % num) + 4) % num;
  }
  if (angle !== -1 && walking_flag == 1) {
    //歩行中であれば
    points[angle].setRadius(points[angle].r + vector * 4);
    if (points[angle].r <= 0) {
      points[angle].setRadius(0);
    }
  }

  stroke(240, 240, 255);
  translate(
    width / 2 + (width / 2) * noise(hoge / 500) - width / 4,
    height / 2 + (height / 2) * noise((hoge + 50) / 500) - height / 4
  );
  for (let n = 0; n < points.length; n++) {
    point(points[n].x, points[n].y);
  }

  if (vector == 1) {
    stroke(240, 152, 6);
    fill(240, 152, 6);
  } else {
    stroke(15, 103, 249);
    fill(15, 103, 249);
  }

  convex_indices = giftwrap(points);
  // draw convex envelope
  //console.log(convex_indices);
  length = 0;
  beginShape();
  for (let m = 0; m < convex_indices.length; m++) {
    length += sqrt(
      (points[convex_indices[m]].x -
        points[convex_indices[(m + 1) % convex_indices.length]].x) **
        2 +
        (points[convex_indices[m]].y -
          points[convex_indices[(m + 1) % convex_indices.length]].y) **
          2
    );
    vertex(points[convex_indices[m]].x, points[convex_indices[m]].y);
  }
  endShape(CLOSE);

  if (angle != -1) {
    strokeWeight(1);
    fill(255);
    ellipse(points[angle].x, points[angle].y, 20, 20);
  }
  pop();

  hoge++;
}

// draw関数終了

//TODO: easing animationで円が楕円形に収束

let hoge = 0;
const num = 8;
let length = 0;
let vector = 1;
let geo_text = "";
let devise_info = "";
let t = 0;
let alpha, beta, gamma;
const lapse = 50; //lapse フレームで遷移アニメーション.

let points = [];
let deltas = [];

let pos_prev, pos_current;

let vibration = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let vibration_ratio_value = 0;
let flame = 0;
let walking_scalar = 1.0;

let latest_x = 0,
  latest_y = 0;
const top_threshold = 1.15;
const bottom_threshold = 0.85;
let walking_flag;
const walking_flags = new Array(5).fill(0);

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
      vibration[flame] = Math.pow(x * x + y * y + z * z, 2);
      flame++;
    }

    if (flame > 9) {
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
      flame = 0;
    }
  },
  true
);
