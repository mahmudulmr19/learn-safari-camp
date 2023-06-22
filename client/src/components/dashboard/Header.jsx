import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMode, useOpen } from "@/hooks";
import { DarkMode, LightMode, Menu, Search } from "@mui/icons-material";
import AccountPopover from "./AccountPopover";

const Header = () => {
  const theme = useTheme();
  const { mode, setMode } = useMode();
  const [isChecked, setIsChecked] = useState(null);
  const { setOpen } = useOpen();

  useEffect(() => {
    setIsChecked(mode === "dark" ? true : false);
  }, [mode]);

  const StyledRoot = styled(AppBar)(({ theme }) => ({
    background: alpha(theme.palette.background.default, 0.8),
    backdropFilter: "blur(6px)",
    boxShadow: "none",
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${280 + 1}px)`,
    },
  }));

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: 64,
    [theme.breakpoints.up("lg")]: {
      minHeight: 92,
      padding: theme.spacing(0, 5),
    },
  }));

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <StyledRoot>
      <StyledToolbar>
        {!isDesktop && (
          <IconButton onClick={() => setOpen(true)}>
            <Menu />
          </IconButton>
        )}
        <IconButton>
          <Search />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={() => setMode()} sx={{ mr: 1 }}>
          {isChecked ? <LightMode /> : <DarkMode />}
        </IconButton>
        <Stack direction="row" alignItems="center">
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
};

export default Header;
