import { GAME_STATUS, TIME } from "../constants";

function StoppedModal(props) {
  const { setGameStatus } = props;
  function start() {
    setGameStatus(GAME_STATUS.PLAYING);
  }
  return (
    <div className="modalCont">
      <h2>Wanna Play?</h2>
      <p>{`Clear the tiles in ${TIME} seconds`}</p>
      <button id="begin" className="modalButton" onClick={start}>
        Start
      </button>
    </div>
  );
}

export default StoppedModal;
