import { GAME_STATUS } from "../constants";

function GameOverModal(props) {
  const { setGameStatus, retry, reset } = props;

  function newGame() {
    reset();
    setGameStatus(GAME_STATUS.PLAYING);
  }

  return (
    <div className="modalCont">
      <h2>Game Over!</h2>

      <span className="actions">
        <button id="retry" className="modalButton" onClick={retry}>
          Retry
        </button>
        <button id="newGame" className="modalButton" onClick={newGame}>
          New Game
        </button>
      </span>
    </div>
  );
}

export default GameOverModal;
