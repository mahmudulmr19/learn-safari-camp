import React from "react";
import { Snackbar, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const Toast = ({ message, open, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default Toast;
