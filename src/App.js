import "./App.css";

import { useEffect, useState } from "react";

import { generateMatrix, checkStraightRoute } from "./utils";
import { GAME_STATUS, colors } from "./constants";

import { FaPlay, FaPause } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";

function App() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.STOPPED);
  const [time, setTime] = useState(20);
  const [matrix, setMatrix] = useState(generateMatrix());
  const [moves, setMoves] = useState([]);
  const [removedCells, setRemovedCells] = useState([]);

  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      const interval = setInterval(() => {
        setTime((time) => (time > 0 ? time - 1 : time));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (time == 0) {
      setGameStatus(GAME_STATUS.STOPPED);
    }
  }, [time]);

  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds - minutes * 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    secs = secs < 10 ? `0${secs}` : secs;
    const time = `${minutes}:${secs}`;

    return time;
  }

  function startTimer() {}

  function stopTimer() {}

  function start() {
    setGameStatus(GAME_STATUS.PLAYING);
    startTimer();
  }

  function pause() {
    setGameStatus(GAME_STATUS.PAUSED);
    stopTimer();
  }

  function reset() {
    setTime(90);
    setGameStatus(GAME_STATUS.STOPPED);
    setMatrix(generateMatrix());
    setRemovedCells([]);
  }

  function handleCellClick(cell) {
    const updatedMoves = moves;

    if (moves.length < 2) {
      const index = updatedMoves.findIndex(
        (c) => c.row === cell.row && c.column === cell.column
      );

      if (index > -1) {
        updatedMoves.splice(index, 1);
      } else {
        updatedMoves.push(cell);
      }

      setMoves([...updatedMoves]);
    }

    if (updatedMoves.length === 2) {
      const isValid = validateMove();

      if (isValid) {
        setRemovedCells((removedCells) => [...removedCells, ...moves]);
      }

      setMoves([]);
    }
  }

  function validateMove() {
    const cell1 = moves[0];

    const cell2 = moves[1];

    const cell1Color = matrix[cell1.row][cell1.column].color;
    const cell2Color = matrix[cell2.row][cell2.column].color;

    if (cell1Color !== cell2Color) {
      return false;
    } else {
      let isValid = checkStraightRoute(matrix, removedCells, cell1, cell2);
      if (isValid) {
        return isValid;
      } else {
        return false;
        //isValid = checkOneTurnRoute(matrix, removedCells, cell1, cell2)
      }
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Onet Connect</h1>
      </header>

      <div className="cont">
        <div className="actions">
          {(gameStatus === GAME_STATUS.STOPPED ||
            gameStatus === GAME_STATUS.PAUSED) && (
            <FaPlay className="play" size={21} onClick={start} />
          )}

          {gameStatus === GAME_STATUS.PLAYING && (
            <FaPause className="play" size={21} onClick={pause} />
          )}

          <span className="reset" onClick={reset}>
            <MdRestartAlt className="resetIcon" size={21} />
            <label>Reset</label>
          </span>

          <span className="time">
            <label className="title">Time:</label>
            <label className="value">{formatTime(time)}</label>
          </span>
        </div>

        <div className="game">
          <table>
            {matrix.map((row, rowId) => {
              return (
                <tr className="row" key={rowId}>
                  {row.map((cell, cellId) => {
                    const isRemoved = removedCells.find(
                      (c) => c.row === cell.row && c.column === cell.column
                    );

                    const isClicked = moves.find(
                      (c) => c.row === cell.row && c.column === cell.column
                    );

                    return (
                      <td
                        key={cellId}
                        className={
                          isRemoved
                            ? "cell cellRemoved"
                            : isClicked
                            ? "cell cellClicked"
                            : "cell"
                        }
                        style={{
                          backgroundColor: isRemoved
                            ? `transparent`
                            : `${colors[cell.color]}`,
                        }}
                        onClick={() => handleCellClick(cell)}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
