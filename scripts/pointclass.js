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
