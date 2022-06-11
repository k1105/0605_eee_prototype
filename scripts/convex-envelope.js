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
    points.push(new Point(80, theta));
  }
}

let convex_indices = [];
let angle = -1;
let hoge = 0;
const num = 8;
let length = 0;
let vector = 1;
let alpha, beta, gamma;
let points = [];
let pos_prev, pos_current;
let inner_text = "";
let status_text = "";

function draw() {
  //notify death

  background(
    255 * (length / 1000) ** 3,
    255 * (length / 1000) ** 3,
    255 * (length / 1000) ** 3
  );

  push();
  fill(0);
  textSize(150);
  inner_text = length.toFixed(2);
  text(inner_text, 30, 400);
  if (vector == 1) {
    status_text = "Expanding until \nenvelope length \n< 1000";
  } else {
    status_text = "Shrinking while \nenvelope length \n> 100";
  }
  textSize(40);
  text(status_text, 30, 470);

  pop();

  push();

  stroke(240, 240, 255);
  translate(
    width / 2 + (width / 2) * noise(hoge / 500) - width / 4,
    height / 2 + (height / 2) * noise((hoge + 50) / 500) - height / 4
  );
  // for (let n = 0; n < points.length; n++) {
  //   point(points[n].x, points[n].y);
  // }

  if (vector == 1) {
    stroke(240, 152, 6);
    fill(240, 152, 6);
  } else {
    stroke(15, 103, 249);
    fill(15, 103, 249);
  }

  // draw convex envelope
  //console.log(convex_indices);
  beginShape();
  for (let m = 0; m < convex_indices.length; m++) {
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

window.addEventListener(
  "deviceorientation",
  function (orientation_event) {
    alpha = orientation_event.alpha;
    beta = orientation_event.beta;
    gamma = orientation_event.gamma;
  },
  true
);

setInterval(() => {
  if (length < 300) {
    vector = 1;
  }

  if (length > 1000) {
    vector = -1;
  }

  angle = -1;
  if (typeof alpha !== "undefined") {
    angle = floor((alpha + 180 / num) / (360 / num)) % num;
  }
  if (angle !== -1) {
    points[angle].setRadius(points[angle].r + vector * 0.3);
    if (points[angle].r <= 0) {
      points[angle].setRadius(0);
    }
  }

  convex_indices = giftwrap(points);

  length = 0;

  for (let m = 0; m < convex_indices.length; m++) {
    length += sqrt(
      (points[convex_indices[m]].x -
        points[convex_indices[(m + 1) % convex_indices.length]].x) **
        2 +
        (points[convex_indices[m]].y -
          points[convex_indices[(m + 1) % convex_indices.length]].y) **
          2
    );
  }
}, 20);
