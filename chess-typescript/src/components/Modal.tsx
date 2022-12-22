import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  gameTime: number;
  setGameTime: (newTime: number) => void;
  restart: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  restart,
  gameTime,
  setGameTime,
}) => {
  const handleClose = () => {
    setIsOpen(false);
    restart();
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Укажите время на игру</DialogTitle>
      <DialogContent>
        <DialogContentText>
          По истечению данного времени игрок будет считаться проигравшим
        </DialogContentText>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Готово</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
