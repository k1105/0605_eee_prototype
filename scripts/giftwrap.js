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
