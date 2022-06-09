function CalcAngle(pos_prev, pos_current, num) {
  //pos_prev, pos_currentを受けて、移動した方位を計算し、360度をnum分割したとき0度を起点として何番目の領域に該当するかを整数で返す関数.
  if (
    pos_prev.coords.longitude === pos_current.coords.longitude &&
    pos_prev.coords.latitude === pos_current.coords.latitude
  ) {
    console.log("ユーザは移動していません");
    return -1;
  } else {
    const prev_x = pos_prev.coords.longitude;
    const prev_y = pos_prev.coords.latitude;
    const current_x = pos_current.coords.longitude;
    const current_y = pos_current.coords.latitude;
    const angle =
      90 -
      (Math.atan2(
        Math.sin(current_x - prev_x),
        Math.cos(prev_y) * Math.tan(current_y) -
          Math.sin(prev_y) * Math.cos(current_x - prev_x)
      ) *
        180) /
        Math.PI +
      180;
    return angle;
  }
}
