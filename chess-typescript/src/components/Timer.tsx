import { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
  currentPlayer: Player | null;
  openRestartDialog: () => void;
  openGameOverDialog: (winner: string) => void;
  gameTime: number;
}

const Timer: FC<TimerProps> = ({
  currentPlayer,
  openRestartDialog,
  openGameOverDialog,
  gameTime,
}) => {
  const [blackTime, setBlackTime] = useState(gameTime);
  const [whiteTime, setWhiteTime] = useState(gameTime);
  const refTimer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  useEffect(() => {
    if (blackTime === 0 || whiteTime === 0) {
      openGameOverDialog(
        currentPlayer?.color === Colors.BLACK ? 'белые' : 'черные'
      );
    }
  }, [blackTime, whiteTime]);

  function startTimer() {
    if (refTimer.current) {
      clearInterval(refTimer.current);
    }

    const callback = () => {
      currentPlayer?.color === Colors.BLACK
        ? decrementBlackTime()
        : decrementWhiteTime();
    };
    refTimer.current = setInterval(callback, 1000);
  }

  function decrementWhiteTime() {
    setWhiteTime((prev) => prev - 1);
  }

  function decrementBlackTime() {
    setBlackTime((prev) => prev - 1);
  }

  return (
    <div className="timer">
      <div>
        <button onClick={openRestartDialog}> Restart game</button>
      </div>
      <h2>Белые - {whiteTime}</h2>
      <h2>Черные - {blackTime}</h2>
    </div>
  );
};

export default Timer;
