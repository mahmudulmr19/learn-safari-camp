import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Logo } from "@/components/global";
import { useAuth, useMode, useRole } from "@/hooks";
import {
  Class,
  DarkMode,
  GridViewSharp,
  Home,
  LightMode,
  LockOpen,
  Menu,
  Person,
} from "@mui/icons-material";
import { StyledNavItem } from "./StyledNavItem";

const Header = () => {
  const theme = useTheme();
  const { palette } = theme;
  const { mode, setMode } = useMode();
  const { currentUser, logout } = useAuth();
  const [role] = useRole();
  const [isChecked, setIsChecked] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    setIsChecked(mode === "dark" ? true : false);
  }, [mode]);

  const StyledRoot = styled(AppBar)(() => ({
    background: alpha(palette.background.default, 0.8),
    boxShadow: "none", //"0 1px 4px rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(6px)",
  }));

  const StyledToolbar = styled(Toolbar)(() => ({
    minHeight: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }));

  const MenuLink = styled(NavLink)(({ theme }) => ({
    color: palette.mode === "dark" ? "#fff" : "#000",
    textDecoration: "none",
    fontWeight: 600,
    fontsize: 14,
    marginRight: theme.spacing(2),
    "&.active": {
      color: theme.palette.primary.main,
    },
  }));

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <StyledRoot>
      <Container>
        <StyledToolbar disableGutters>
          <Logo />
          {isDesktop ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
            >
              <MenuLink to="/">Home</MenuLink>
              <MenuLink to="/instructors">Instructors</MenuLink>
              <MenuLink to="/classes">Classes</MenuLink>
              {currentUser &&
                role && ( // prettier-ignore
                  <MenuLink
                    to={
                      role === "student"
                        ? "/student_dashboard"
                        : role === "instructor"
                        ? "/instructor_dashboard"
                        : "/admin_dashboard"
                    }
                  >
                    Dashboard
                  </MenuLink>
                )}

              {currentUser ? (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Avatar
                    onClick={() => setIsPopoverOpen((prev) => !prev)}
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                    sx={{ cursor: "pointer" }}
                  />

                  {isPopoverOpen && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "68px",
                        borderRadius: "5px",
                        padding: "5px",
                        right: "0px",
                        width: 180,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.shadows[10],
                      }}
                    >
                      <Box sx={{ my: 1.5, px: 2.5 }}>
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{
                            color: theme.palette.text.primary,
                          }}
                        >
                          {currentUser.displayName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                          noWrap
                        >
                          {role}
                        </Typography>
                      </Box>
                      <Divider />
                      <MenuItem
                        onClick={() => logout()}
                        sx={{
                          m: 1,
                          color: theme.palette.text.primary,
                          borderRadius: "5px",
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Box>
                  )}
                </div>
              ) : (
                <MenuLink to="/auth/login">
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      color: palette.mode === "dark" ? "#fff" : "#000",
                      borderColor: alpha(palette.text.primary, 0.2),
                      px: 2.5,
                      "&:hover": {
                        borderColor: palette.text.secondary,
                      },
                    }}
                  >
                    Login
                  </Button>
                </MenuLink>
              )}

              <IconButton onClick={() => setMode()}>
                {isChecked ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          ) : (
            <Box>
              <IconButton onClick={() => setMode()}>
                {isChecked ? <LightMode /> : <DarkMode />}
              </IconButton>
              <IconButton onClick={() => setIsMenuOpen(true)}>
                <Menu />
              </IconButton>
            </Box>
          )}

          {!isDesktop && (
            <Drawer
              open={isMenuOpen}
              onClose={() => setIsMenuOpen((prev) => !prev)}
              anchor="left"
              ModalProps={{
                keepMounted: true,
              }}
              PaperProps={{
                sx: {
                  width: 280,
                },
              }}
            >
              <Box
                sx={{
                  height: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
                  <Logo />
                </Box>

                <Box>
                  <List disablePadding sx={{ p: 1 }}>
                    <StyledNavItem
                      component={NavLink}
                      to="/"
                      sx={{
                        "&.active": {
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.dark, 0.1),
                          fontWeight: 500,
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" pl={2} gap={1}>
                        <Home />
                        <ListItemText disableTypography primary="Home" />
                      </Box>
                    </StyledNavItem>

                    <StyledNavItem
                      component={NavLink}
                      to="/instructors"
                      sx={{
                        "&.active": {
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.dark, 0.1),
                          fontWeight: 500,
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" pl={2} gap={1}>
                        <Person />
                        <ListItemText disableTypography primary="Instructors" />
                      </Box>
                    </StyledNavItem>

                    <StyledNavItem
                      component={NavLink}
                      to="/classes"
                      sx={{
                        "&.active": {
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.dark, 0.1),
                          fontWeight: 500,
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" pl={2} gap={1}>
                        <Class />
                        <ListItemText disableTypography primary="Classes" />
                      </Box>
                    </StyledNavItem>

                    {currentUser ? (
                      <StyledNavItem
                        component={NavLink}
                        to={
                          role === "student"
                            ? "/student_dashboard"
                            : role === "instructor"
                            ? "/instructor_dashboard"
                            : "/admin_dashboard"
                        }
                      >
                        <Box display="flex" alignItems="center" pl={2} gap={1}>
                          <GridViewSharp />
                          <ListItemText disableTypography primary="Dashboard" />
                        </Box>
                      </StyledNavItem>
                    ) : (
                      <StyledNavItem component={NavLink} to="/auth/login">
                        <Box display="flex" alignItems="center" pl={2} gap={1}>
                          <LockOpen />
                          <ListItemText disableTypography primary="Login" />
                        </Box>
                      </StyledNavItem>
                    )}
                  </List>
                </Box>
              </Box>
            </Drawer>
          )}
        </StyledToolbar>
      </Container>
    </StyledRoot>
  );
};

export default Header;
