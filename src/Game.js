import { useEffect, useState } from "react";
import { initGame, scramble, moveTiles } from "./GameLogic";
import Timer from "./Timer";
import Tile from "./Tile";

export default function Game() {
  const scrambleCount = 10000;
  const winningGame = initGame();
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);
  // const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [tiles, setTiles] = useState(scramble(winningGame, scrambleCount));

  useEffect(() => {
    let interval;
    if (startTime && !hasWon) {
      interval = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime)/1000));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [startTime, hasWon, timer]);

  function restartGame() {
    setHasWon(false);
    setStartTime(null);
    setTimer(0);
    setTiles(scramble(winningGame, scrambleCount));
  }

  function handleClick(index) {
    if (!startTime) {
      setStartTime(new Date());
    }
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
      <button className="victory-button" onClick={restartGame}>
        Play Again
      </button>
    </div>
  );

  return (
    <div className="main-content">
      <Timer timer={timer} hasWon={hasWon} started={startTime ? true : false} />
      <div className="board-flex">
        <div className="game-board">{hasWon ? playAgain : tileElements}</div>
      </div>
    </div>
  );
}
