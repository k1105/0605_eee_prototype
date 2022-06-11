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

//TODO: easing animationで円が楕円形に収束

let hoge = 0;
const time = 10;
const num = 8;
let length = 0;
let vector = 1;
let geo_text = "";
let devise_info = "";
let t = 0;
let absolute,
  alpha,
  beta,
  gamma = 0;
let aX,
  aY,
  aZ = 0;
const lapse = 50; //lapse フレームで遷移アニメーション.

let points = [];
let deltas = [];

let pos_prev, pos_current;

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
  }
  if (angle !== -1) {
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

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  absolute = event.absolute;
  alpha = event.alpha;
  beta = event.beta;
  gamma = event.gamma;
}

// 加速度センサの値が変化したら実行される devicemotion イベント
window.addEventListener("devicemotion", (dat) => {
  aX = dat.accelerationIncludingGravity.x; // x軸の重力加速度（Android と iOSでは正負が逆）
  aY = dat.accelerationIncludingGravity.y; // y軸の重力加速度（Android と iOSでは正負が逆）
  aZ = dat.accelerationIncludingGravity.z; // z軸の重力加速度（Android と iOSでは正負が逆）
});
