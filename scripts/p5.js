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

const begin = 100;
const end = 500;
let i = begin;
let hoge = 0;
const time = 10;
const num = 8;

function draw() {
  if (i < end) {
    // この計算の場合、処理が完了するのは: delta / (delta/100) = 100flames.
    i += (end - begin) / time;
    //console.log(i);
  }

  background(255);

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
  //stroke(230, 230, 255);

  convex_indices = giftwrap(points);
  // draw convex envelope
  //console.log(convex_indices);
  let length = 0;
  for (let m = 0; m < convex_indices.length; m++) {
    length += sqrt(
      (points[convex_indices[m]].x -
        points[convex_indices[(m + 1) % convex_indices.length]].x) **
        2 +
        (points[convex_indices[m]].y -
          points[convex_indices[(m + 1) % convex_indices.length]].y) **
          2
    );
    line(
      points[convex_indices[m]].x,
      points[convex_indices[m]].y,
      points[convex_indices[(m + 1) % convex_indices.length]].x,
      points[convex_indices[(m + 1) % convex_indices.length]].y
    );
  }
  pop();

  push();
  fill(0);
  textSize(32);
  noStroke();
  text("envelope length: " + length, 10, 30);
  pop();

  for (let i = 0; i < num; i++) {
    points[i].setRadius(300 * noise((hoge + 100 * i) / 1000));
  }
  hoge++;
  //points[5].setRadius(i);
  //points[3].setRadius(i);
}

class Point {
  constructor(r, theta) {
    this.x = r * Math.cos(theta);
    this.y = r * Math.sin(theta);
    this.r = r;
    this.theta = theta;
  }

  setRadius(r) {
    this.r = r;
    this.x = r * Math.cos(this.theta);
    this.y = r * Math.sin(this.theta);
  }
  setAngle(theta) {
    this.theta = theta;
    this.x = this.r * Math.cos(theta);
    this.y = this.r * Math.sin(theta);
  }
}

const giftwrap = (points) => {
  //pointsのうち、x最小のものを見つける. もし最小のxをとるpointが複数ある場合は、その中でもyが最小のものを選ぶ
  index = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i].y > points[index].y) {
      index = i;
    } else if (
      points[i].y == points[index].y &&
      points[i].x > points[index].x
    ) {
      index = i;
    }
  }

  const convex_indices = [];
  convex_indices.push(index);

  let prev_min_delta = -100;
  //最初の注目点は先の計算でもとまったindexに該当する点。
  //重複をチェックすることで一巡したことを確認する。
  while (true) {
    let min_delta = 100;
    for (let i = 0; i < points.length; i++) {
      if (i != index) {
        //偏角を求める
        delta = atan2(
          points[i].y - points[index].y,
          points[i].x - points[index].x
        );
        //console.log("delta: " + delta);
        if (prev_min_delta < delta && delta < min_delta) {
          if (i == convex_indices[0] || !convex_indices.includes(i)) {
            min_delta = delta;
            tmp = i;
          }
        }
      }
    }

    prev_min_delta = min_delta;
    index = tmp;
    //console.log("min_delta: " + min_delta);
    if (index == convex_indices[0]) break;
    convex_indices.push(index);
  }

  return convex_indices;
};
