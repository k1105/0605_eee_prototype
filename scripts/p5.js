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
    points.push(new Point(100 * random(0.5, 2), theta));
    deltas.push(0);
  }
}

//TODO: easing animationで円が楕円形に収束

let hoge = 0;
const time = 10;
const num = 8;
let length = 0;
let toggle = true;
let geo_text = "";
let t = 0;
const lapse = 50; //lapse フレームで遷移アニメーション.

let points = [];
let deltas = [];

function draw() {
  //notify death

  background(
    255 * (length / 1000) ** 3,
    255 * (length / 1000) ** 3,
    255 * (length / 1000) ** 3
  );

  push();
  fill(0);
  textSize(400);
  noStroke();
  text(Math.round(length * 100) / 100, 10, 800);
  textSize(36);
  text(geo_text, 10, 40);
  pop();

  push();
  stroke(240, 240, 255);
  // translate(
  //   width / 2 + 400 * noise(hoge / 1000) - 200,
  //   height / 2 + 400 * noise((hoge + 50) / 1000) - 200
  // );
  translate(width / 2, height / 2);
  for (let n = 0; n < points.length; n++) {
    point(points[n].x, points[n].y);
  }

  stroke(240, 152, 6);
  fill(240, 152, 6);
  //stroke(230, 230, 255);

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
  pop();

  // for (let i = 0; i < num; i++) {
  //   points[i].setRadius(300 * noise((hoge + 100 * i) / 1000));
  // }

  if (t < lapse) {
    for (let i = 0; i < num; i++) {
      console.log(points[i].r);
      points[i].setRadius(points[i].r + deltas[i] / lapse);
      console.log(points[i].r);
    }
    t++;
  }
  hoge++;
}

// draw関数終了

setInterval(() => {
  navigator.geolocation.getCurrentPosition(printGpsInfo);
}, 10000);

setInterval(() => {
  deltas = getRadiusDelta(points);
  console.log(deltas);
  t = 0;
}, 3000);

function printGpsInfo(position) {
  geo_text = "Latitude:" + position.coords.latitude + "\n";
  geo_text += "Longitude: " + position.coords.longitude + "\n";
  geo_text += "Altitude: " + position.coords.altitude + "\n";
  geo_text += "Accuracy: " + position.coords.accuracy + "\n";
  geo_text += "Altitude Accuracy:" + position.coords.altitudeAccuracy + "\n";
  geo_text += "Heading: " + position.coords.heading + "\n";
  geo_text += "Speed: " + position.coords.speed + "\n";

  let date = new Date(position.timestamp);

  geo_text += "Date: " + date.toLocaleString() + "\n";

  //console.log(geo_text);
}

function getRadiusDelta(points) {
  //更新後の頂点の位置情報を返す関数.
  const deltas = [];
  for (let i = 0; i < points.length; i++) {
    deltas.push(300 * random(0.5, 1.5) - points[i].r);
  }

  return deltas;
}
