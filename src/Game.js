import { useState } from "react";
import Tile from "./Tile";

export default function Game() {
  const winningGame = initGame();
  const [hasWon, setHasWon] = useState(false);
  const [tiles, setTiles] = useState(scramble());

  function initGame() {
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

  function scramble(times) {
    let startingBoard = [...winningGame];
    for (let i = 0; i < 10000; i++) {
      const index = Math.floor(Math.random() * 15) + 1;
      startingBoard = moveTiles(startingBoard, index);
    }
    return startingBoard;
  }

  function restartGame() {
    setHasWon(false)
    setTiles(scramble())
  }

  function moveTiles(tileArray, tileMoved) {
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

  function handleClick(index) {
    setTiles((prevTiles) => {
      const newBoard = moveTiles(prevTiles, index);
      if (JSON.stringify(newBoard) === JSON.stringify(winningGame)) {
        setHasWon(true);
      }
      return newBoard;
    });
  }

  const tileElements = tiles.map((tile, index) => {
    return (
      <Tile
        key={index}
        row={tile.row}
        col={tile.col}
        value={index}
        handleClick={() => handleClick(index)}
      />
    );
  });

  const playAgain = (
    <div className="victory">
      <h1 className="victory-words">You Win!</h1>
      <button className="victory-button" onClick={restartGame}>Play Again</button>
    </div>
  );

  return <div className="game-board">{hasWon ? playAgain : tileElements}</div>;
}
