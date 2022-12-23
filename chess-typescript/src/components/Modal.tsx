import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalProps {
  isOpen: boolean;
  title: string;
  contentText: string;
  dialogContent: ReactNode;
  dialogActions: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  contentText,
  dialogActions,
  dialogContent,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        {dialogContent}
      </DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
