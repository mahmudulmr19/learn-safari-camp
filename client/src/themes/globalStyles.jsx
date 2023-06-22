import React from "react";
import { GlobalStyles as MUIGlobalStyles } from "@mui/material";

const globalStyles = () => {
  const inputGlobalStyles = (
    <>
      <MUIGlobalStyles
        styles={{
          "*": {
            boxSizing: "border-box",
          },
          html: {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
            WebkitOverflowScrolling: "touch",
          },
          body: {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
          },
          "#root": {
            width: "100%",
            height: "100%",
          },
          a: {
            textDecoration: "none",
          },
          input: {
            "&[type=number]": {
              MozAppearance: "textfield",
              "&::-webkit-outer-spin-button": {
                margin: 0,
                WebkitAppearance: "none",
              },
              "&::-webkit-inner-spin-button": {
                margin: 0,
                WebkitAppearance: "none",
              },
            },
          },
          img: {
            display: "block",
            maxWidth: "100%",
          },
          ul: {
            margin: 0,
            padding: 0,
          },
        }}
      />
    </>
  );

  return inputGlobalStyles;
};

export default globalStyles;
