export function initGame() {
  let tileArray = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      tileArray.push({
        row: row,
        col: col,
      });
    }
  }
  tileArray.unshift(tileArray.pop());
  return tileArray;
}

export function scramble(board, times) {
  let startingBoard = [...board];
  for (let i = 0; i < times; i++) {
    const index = Math.floor(Math.random() * 15) + 1;
    startingBoard = moveTiles(startingBoard, index);
  }
  return startingBoard;
}

export function moveTiles(tileArray, tileMoved) {
  const clickedTile = tileArray[tileMoved];
  const zeroTile = tileArray[0];

  let axis;
  if (clickedTile.row === zeroTile.row) {
    axis = { parallel: "row", perpendicular: "col" };
  } else if (clickedTile.col === zeroTile.col) {
    axis = { parallel: "col", perpendicular: "row" };
  } else {
    return tileArray;
  }
  return tileArray.map((tile, index) => {
    if (index === 0) {
      return {
        ...tile,
        [axis.perpendicular]: clickedTile[axis.perpendicular],
      };
      // same row or column
    } else if (tile[axis.parallel] === zeroTile[axis.parallel]) {
      let newPos;
      if (
        tile[axis.perpendicular] >= clickedTile[axis.perpendicular] &&
        tile[axis.perpendicular] < zeroTile[axis.perpendicular]
      ) {
        newPos = tile[axis.perpendicular] + 1;
      } else if (
        tile[axis.perpendicular] <= clickedTile[axis.perpendicular] &&
        tile[axis.perpendicular] > zeroTile[axis.perpendicular]
      ) {
        newPos = tile[axis.perpendicular] - 1;
      } else {
        newPos = tile[axis.perpendicular];
      }
      return {
        ...tile,
        [axis.perpendicular]: newPos,
      };
    } else {
      return tile;
    }
  });
}
