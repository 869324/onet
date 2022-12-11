import { GAME_STATUS, TIME } from "../constants";

function PausedModal(props) {
  const { setGameStatus } = props;
  function play() {
    setGameStatus(GAME_STATUS.PLAYING);
  }
  return (
    <div className="modalCont">
      <h2>Paused</h2>
      <p>{`Clear the tiles in ${TIME} seconds`}</p>
      <button id="begin" className="modalButton" onClick={play}>
        Resume
      </button>
    </div>
  );
}

export default PausedModal;
