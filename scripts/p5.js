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
  }
}

//TODO: easing animationで円が楕円形に収束

const points = [];

let hoge = 0;
const time = 10;
const num = 8;
let length = 0;
let toggle = true;
let geo_text = "";

function draw() {
  //notify death

  background(
    255 * (length / 1000) ** 3,
    255 * (length / 1000) ** 3,
    255 * (length / 1000) ** 3
  );
  // if (length > 1000) {
  //   if (toggle) {
  //     background(255, 0, 0);
  //   } else {
  //     background(255);
  //   }
  //   toggle = !toggle;
  // }

  push();
  stroke(240, 240, 255);
  translate(
    width / 2 + 400 * noise(hoge / 1000) - 200,
    height / 2 + 400 * noise((hoge + 50) / 1000) - 200
  );
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

  push();
  fill(0);
  textSize(400);
  noStroke();
  text(Math.round(length * 100) / 100, 10, 800);
  textSize(36);
  text(geo_text, 10, 40);
  pop();

  for (let i = 0; i < num; i++) {
    points[i].setRadius(300 * noise((hoge + 100 * i) / 1000));
  }
  hoge++;
}

// draw関数終了

setInterval(() => {
  navigator.geolocation.getCurrentPosition(test2);
}, 10000);

function test2(position) {
  geo_text = "緯度:" + position.coords.latitude + "\n";
  geo_text += "経度:" + position.coords.longitude + "\n";
  geo_text += "高度:" + position.coords.altitude + "\n";
  geo_text += "位置精度:" + position.coords.accuracy + "\n";
  geo_text += "高度精度:" + position.coords.altitudeAccuracy + "\n";
  geo_text += "移動方向:" + position.coords.heading + "\n";
  geo_text += "速度:" + position.coords.speed + "\n";

  let date = new Date(position.timestamp);

  geo_text += "取得時刻:" + date.toLocaleString() + "\n";

  //console.log(geo_text);
}
