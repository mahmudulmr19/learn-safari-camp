import React from "react";
import { Box, List } from "@mui/material";
import SidebarItem from "./SidebarItem";

const SidebarLink = ({ data = [] }) => {
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            Icon={item.icon}
            path={item.path}
          />
        ))}
      </List>
    </Box>
  );
};

export default SidebarLink;
