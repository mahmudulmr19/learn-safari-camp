import { useOpen } from "@/hooks";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ title, path, Icon }) => {
  const { setOpen } = useOpen();
  const theme = useTheme();
  return (
    <StyledSidebarItem
      onClick={() => setOpen(false)}
      component={NavLink}
      to={path}
      sx={{
        "&.active": {
          color: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.dark, 0.1),
          fontWeight: 500,
        },
      }}
    >
      <ListItemIcon
        sx={{
          width: 22,
          height: 22,
          color: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Icon && <Icon />}
      </ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </StyledSidebarItem>
  );
};

export default SidebarItem;

const StyledSidebarItem = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));
