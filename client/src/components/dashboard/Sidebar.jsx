import React from "react";
import {
  Avatar,
  Box,
  Drawer,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Logo } from "@/components/global";
import { useAuth, useRole } from "@/hooks";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import SidebarLink from "./sidebar/SidebarLink";

const Sidebar = ({ openSidebar, onCloseSidebar, data }) => {
  const { currentUser } = useAuth();
  const [role] = useRole();
  const StyledAccount = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
  }));

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const renderContent = (
    <Box>
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={currentUser?.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {currentUser?.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <SidebarLink data={data} />
    </Box>
  );

  return (
    <>
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: 280,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
          sx={{
            flexShrink: { lg: 0 },
            width: { lg: 280 },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openSidebar}
          onClose={onCloseSidebar}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: 280 },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
