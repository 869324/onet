import "./App.css";

import { useState } from "react";

import { generateMatrix } from "./utils";
import { GAME_STATUS, colors } from "./constants";

import { FaPlay, FaPause } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";

function App() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.STOPPED);
  const [time, setTime] = useState(0);
  const [matrix, setMatrix] = useState(generateMatrix());
  const [moves, setMoves] = useState([]);
  const [removedCells, setRemovedCells] = useState([]);

  function formatTime(seconds) {
    let minutes = seconds / 60;
    let secs = seconds - minutes * 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    secs = secs < 10 ? `0${secs}` : secs;
    const time = `${minutes}:${secs}`;

    return time;
  }

  function reset() {
    setTime(0);
    setGameStatus(GAME_STATUS.STOPPED);
    setMatrix(generateMatrix());
    setRemovedCells([]);
  }

  function handleCellClick(cell) {
    const id = `${cell.rowId}${cell.cellId}`;
    if (moves.length < 2) {
      const updatedMoves = moves;

      const index = updatedMoves.findIndex((c) => c === id);

      if (index > -1) {
        updatedMoves.splice(index, 1);
      } else {
        updatedMoves.push(id);
      }

      setMoves([...updatedMoves]);
    }

    if (moves.length === 2) {
      const isValid = validateMove();

      if (isValid) {
        setRemovedCells((removedCells) => [...removedCells, ...moves]);
      }

      setMoves([]);
    }
  }

  function validateMove() {
    return true;
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
            <FaPlay className="play" size={21} />
          )}

          {gameStatus === GAME_STATUS.PLAYING && (
            <FaPause className="play" size={21} />
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
                    const isRemoved = removedCells.includes(
                      `${rowId}${cellId}`
                    );

                    console.log({ moves, id: `${rowId}${cellId}` });
                    const isClicked = moves.includes(`${rowId}${cellId}`);

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
                        onClick={() =>
                          handleCellClick({ ...cell, rowId, cellId })
                        }
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
