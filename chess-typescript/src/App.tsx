import { useEffect, useState } from 'react';
import './App.css';

import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Modal from './components/Modal';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState(new Board());
  const [isOpenDialog, setOpen] = useState(false);
  const [gameTime, setGameTime] = useState(300);
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(
    new Player(Colors.WHITE)
  );
  const [blackPlayer, setBlackPlayer] = useState<Player | null>(
    new Player(Colors.BLACK)
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    openDialog();
  }, []);

  const openDialog = () => {
    setOpen(true);
  };

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
      {!isOpenDialog && (
        <>
          <Timer
            restart={openDialog}
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
        isOpen={isOpenDialog}
        setIsOpen={setOpen}
        restart={restart}
        gameTime={gameTime}
        setGameTime={setGameTime}
      ></Modal>
    </div>
  );
}

export default App;
