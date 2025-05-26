"use client"

import React from "react";
import { Modal, Box, Typography } from '@mui/material';
import { ChildrenTypes } from "@/interfaces";
import { useAlertErrorStore } from "@/store";

const AlertErrorProvider: React.FC<ChildrenTypes> = ({ children }) => {
  const { title, message, closeAlertError } = useAlertErrorStore();

  const isOpen = Boolean(title || message);

  return (
    <>
      {children}
      <Modal
        open={isOpen}
        onClose={closeAlertError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 350,
          width: '30%',
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
            {message}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default AlertErrorProvider;