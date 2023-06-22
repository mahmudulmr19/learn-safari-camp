import React from "react";
import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "@/components/dashboard";
import { AddCircleOutline, Class, GridViewSharp } from "@mui/icons-material";
import { useOpen } from "@/hooks";

const InstructorLayout = () => {
  const { open, setOpen } = useOpen();
  const StyledRoot = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
  });

  const Main = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: 64 + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
      paddingTop: 92 + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  const data = [
    {
      title: "Dashboard",
      path: "/instructor_dashboard/home",
      icon: GridViewSharp,
    },
    {
      title: "Add a Class",
      path: "/instructor_dashboard/add_class",
      icon: AddCircleOutline,
    },
    {
      title: "My Classes",
      path: "/instructor_dashboard/my_classes",
      icon: Class,
    },
  ];
  return (
    <StyledRoot>
      <Header />
      <Sidebar
        openSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        data={data}
      />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
};

export default InstructorLayout;
