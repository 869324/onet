import { GAME_STATUS } from "../constants";

function GameWonModal(props) {
  const { setGameStatus, reset } = props;

  function newGame() {
    reset();
    setGameStatus(GAME_STATUS.PLAYING);
  }

  return (
    <div className="modalCont">
      <h2>You are A Winner!</h2>

      <p>Congratulations</p>

      <button id="newGame" className="modalButton" onClick={newGame}>
        New Game
      </button>
    </div>
  );
}

export default GameWonModal;
