import { GAME_STATUS } from "../constants";
import GameOverModal from "./gameOverModal";
import GameWonModal from "./gameWonModal";
import PausedModal from "./pausedModal";
import StoppedModal from "./stoppedModal";

function Modal(props) {
  const { type } = props;
  return (
    <div className="modalBg">
      {type == GAME_STATUS.STOPPED && <StoppedModal {...props} />}
      {type == GAME_STATUS.GAME_OVER && <GameOverModal {...props} />}
      {type == GAME_STATUS.PAUSED && <PausedModal {...props} />}
      {type == GAME_STATUS.WON && <GameWonModal {...props} />}
    </div>
  );
}

export default Modal;
