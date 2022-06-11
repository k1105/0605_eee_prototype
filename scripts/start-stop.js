function setup() {
  //キャンバスを作成
  createCanvas(window.windowWidth, window.windowHeight);
  //背景色
  //オブジェクトの色
  noFill();
  strokeWeight(10);
}

function draw() {
  //notify death

  background(0);
}

// function setup() {
//   //キャンバスを作成
//   createCanvas(window.windowWidth, window.windowHeight);
//   //背景色
//   //オブジェクトの色
//   noFill();
//   strokeWeight(10);
//   //キャンバスの中心に直径100pxの丸を描画
//   //ellipse(width / 2, height / 2, 100);
//   for (let theta = 0; theta < 2 * Math.PI; theta += (2 * Math.PI) / num) {
//     points.push(new Point(100, theta));
//     deltas.push(0);
//   }
// }

// //TODO: easing animationで円が楕円形に収束

// let hoge = 0;
// const time = 10;
// const num = 8;
// let length = 0;
// let vector = 1;
// let geo_text = "";
// let devise_info = "";
// let t = 0;
// let absolute,
//   alpha,
//   beta,
//   gamma = 0;
// let aX,
//   aY,
//   aZ = 0;
// const lapse = 50; //lapse フレームで遷移アニメーション.

// let points = [];
// let deltas = [];

// let pos_prev, pos_current;

// function draw() {
//   //notify death

//   background(
//     255 * (length / 1000) ** 3,
//     255 * (length / 1000) ** 3,
//     255 * (length / 1000) ** 3
//   );

//   // push();
//   // fill(0);
//   // textSize(400);
//   // noStroke();
//   // text(Math.round(length * 100) / 100, 10, 800);
//   // textSize(36);
//   // text(geo_text, 10, 40);
//   // devise_info = "";
//   // devise_info += "absolute: " + absolute + "\n";
//   // devise_info += "alpha: " + alpha + "\n";
//   // devise_info += "beta: " + beta + "\n";
//   // devise_info += "gamma: " + gamma + "\n";
//   // devise_info += "aX: " + aX + "\n";
//   // devise_info += "aY: " + aY + "\n";
//   // devise_info += "aZ: " + aZ + "\n";
//   // text(devise_info, 10, 150);
//   // pop();

//   push();
//   stroke(240, 240, 255);
//   translate(
//     width / 2 + (width / 2) * noise(hoge / 500) - width / 4,
//     height / 2 + (height / 2) * noise((hoge + 50) / 500) - height / 4
//   );
//   // translate(width / 2, height / 2);
//   for (let n = 0; n < points.length; n++) {
//     point(points[n].x, points[n].y);
//   }

//   if (vector == 1) {
//     stroke(240, 152, 6);
//     fill(240, 152, 6);
//   } else {
//     stroke(15, 103, 249);
//     fill(15, 103, 249);
//   }

//   //stroke(230, 230, 255);

//   convex_indices = giftwrap(points);
//   // draw convex envelope
//   //console.log(convex_indices);
//   length = 0;
//   beginShape();
//   for (let m = 0; m < convex_indices.length; m++) {
//     length += sqrt(
//       (points[convex_indices[m]].x -
//         points[convex_indices[(m + 1) % convex_indices.length]].x) **
//         2 +
//         (points[convex_indices[m]].y -
//           points[convex_indices[(m + 1) % convex_indices.length]].y) **
//           2
//     );
//     vertex(points[convex_indices[m]].x, points[convex_indices[m]].y);
//   }
//   endShape(CLOSE);
//   pop();

//   if (length < 500) {
//     vector = 1;
//   }

//   if (length > 1500) {
//     vector = -1;
//   }

//   // for (let i = 0; i < num; i++) {
//   //   points[i].setRadius(300 * noise((hoge + 100 * i) / 1000));
//   // }

//   let angle = -1;
//   if (typeof alpha !== "undefined") {
//     angle = floor((alpha + 180 / num) / (360 / num)) % num;
//   }
//   if (angle !== -1) {
//     points[angle].setRadius(points[angle].r + vector * 4);
//     if (points[angle].r <= 0) {
//       points[angle].setRadius(0);
//     }
//   }

//   if (t < lapse) {
//     for (let i = 0; i < num; i++) {
//       points[i].setRadius(points[i].r + deltas[i] / lapse);
//     }
//     t++;
//   }
//   hoge++;
// }

// // draw関数終了

// // setInterval(() => {
// //   navigator.geolocation.getCurrentPosition(printGpsInfo);
// // }, 5000);

// // setInterval(() => {
// //   deltas = getRadiusDelta(points);
// //   console.log(deltas);
// //   t = 0;
// // }, 2000);

// function printGpsInfo(position) {
//   // geo_text = "Latitude:" + position.coords.latitude + "\n";
//   // geo_text += "Longitude: " + position.coords.longitude + "\n";
//   // geo_text += "Altitude: " + position.coords.altitude + "\n";
//   // geo_text += "Accuracy: " + position.coords.accuracy + "\n";
//   // geo_text += "Altitude Accuracy:" + position.coords.altitudeAccuracy + "\n";
//   // geo_text += "Heading: " + position.coords.heading + "\n";
//   // geo_text += "Speed: " + position.coords.speed + "\n";

//   // let date = new Date(position.timestamp);

//   // geo_text += "Date: " + date.toLocaleString() + "\n";

//   pos_prev = pos_current;
//   pos_current = position;
//   deltas = new Array(num).fill(0);
//   t = 0;

//   geo_text = "";

//   if (typeof pos_prev !== "undefined") {
//     // console.log(CalcDistance(pos_prev, pos_current));
//     // console.log(CalcAngle(pos_prev, pos_current, num));
//     geo_text += "Distance:" + CalcDistance(pos_prev, pos_current) + "\n";
//     geo_text += "Angle:" + CalcAngle(pos_prev, pos_current, num);

//     //const angle = floor(CalcAngle(pos_prev, pos_current, num) / (360 / num));
//     // const angle = -1;
//     // if (typeof alpha !== "undefined") {
//     //   angle = floor(alpha / (360 / num));
//     // }
//     // if (angle !== -1) {
//     //   deltas[angle] = 1;
//     // }
//   }
//   //console.log(geo_text);
// }

// function getRadiusDelta(points) {
//   //更新後の頂点の位置情報を返す関数.
//   const deltas = [];
//   for (let i = 0; i < points.length; i++) {
//     deltas.push(300 * random(0.5, 1.5) - points[i].r);
//   }

//   return deltas;
// }

// window.addEventListener("deviceorientation", handleOrientation, true);

// function handleOrientation(event) {
//   absolute = event.absolute;
//   alpha = event.alpha;
//   beta = event.beta;
//   gamma = event.gamma;
// }

// // 加速度センサの値が変化したら実行される devicemotion イベント
// window.addEventListener("devicemotion", (dat) => {
//   aX = dat.accelerationIncludingGravity.x; // x軸の重力加速度（Android と iOSでは正負が逆）
//   aY = dat.accelerationIncludingGravity.y; // y軸の重力加速度（Android と iOSでは正負が逆）
//   aZ = dat.accelerationIncludingGravity.z; // z軸の重力加速度（Android と iOSでは正負が逆）
// });
