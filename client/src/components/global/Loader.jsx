import React from "react";

import { Box, LinearProgress } from "@mui/material";
const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "20%",
        }}
      >
        <LinearProgress
          color="primary"
          sx={{
            borderRadius: "4px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Loader;
