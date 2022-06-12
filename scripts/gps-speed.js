const elem = document.getElementById("innerHTMLtxt");

setInterval(() => {
  navigator.geolocation.getCurrentPosition(test2);
}, 3000);

function test2(position) {
  var geo_text = "緯度:" + position.coords.latitude + "\n";
  geo_text += "経度:" + position.coords.longitude + "\n";
  geo_text += "高度:" + position.coords.altitude + "\n";
  geo_text += "移動方向:" + position.coords.heading + "\n";
  geo_text += "速度:" + position.coords.speed + "\n";

  elem.innerHTML = geo_text;
}
