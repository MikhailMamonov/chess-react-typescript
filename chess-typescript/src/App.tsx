import { useState } from 'react';
import './App.css';

import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Modal from './components/Modal';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function App() {
  const [board, setBoard] = useState(new Board());
  const [isOpenRestart, setIsOpenRestart] = useState(true);
  const [isOpenGameOver, setIsOpenGameOver] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const [gameTime, setGameTime] = useState(300);
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(
    new Player(Colors.WHITE)
  );
  const [blackPlayer, setBlackPlayer] = useState<Player | null>(
    new Player(Colors.BLACK)
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const closeRestartDialog = () => {
    restart();
    setIsOpenRestart(false);
  };

  const playAgainHandler = () => {
    setIsOpenGameOver(false);
    setIsOpenRestart(true);
  };

  const leaveGameHandler = () => {
    setIsOpenGameOver(false);
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  const openGameOver = (winner: string) => {
    setWinMessage(`Победили ${winner}`);
    setIsOpenGameOver(true);
  };
  const dialogContent = (
    <TextField
      autoFocus
      id="name"
      label="Количество секунд"
      type="number"
      fullWidth
      variant="standard"
      defaultValue={gameTime}
      onChange={(e) => {
        setGameTime(Number(e.target.value));
      }}
    />
  );

  const restart = () => {
    const board = new Board();
    board.initCells();
    board.addFigures();
    setBoard(board);
    setCurrentPlayer(whitePlayer);
  };

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  };

  return (
    <div className="app">
      {!isOpenRestart && !isOpenGameOver && (
        <>
          <Timer
            openRestartDialog={() => setIsOpenRestart(true)}
            openGameOverDialog={openGameOver}
            currentPlayer={currentPlayer}
            gameTime={gameTime}
          ></Timer>
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPLayer={currentPlayer}
            swapPlayer={swapPlayer}
          />
          <div>
            <LostFigures
              title="Черные фигуры"
              figures={board.lostBlackFigures}
            ></LostFigures>
            <LostFigures
              title="Белые фигуры"
              figures={board.lostWhiteFigures}
            ></LostFigures>
          </div>
        </>
      )}
      <Modal
        isOpen={isOpenRestart}
        title="Укажите время на игру"
        contentText="По истечению данного времени игрок будет считаться проигравшим"
        dialogActions={<Button onClick={closeRestartDialog}>Готово</Button>}
        dialogContent={dialogContent}
      />
      <Modal
        isOpen={isOpenGameOver}
        title="Время истекло"
        contentText={winMessage}
        dialogActions={
          <>
            <Button onClick={playAgainHandler}>Сыграть еще раз</Button>
            <Button onClick={leaveGameHandler}>Покинуть игру</Button>
          </>
        }
        dialogContent={null}
      ></Modal>
    </div>
  );
}

export default App;
