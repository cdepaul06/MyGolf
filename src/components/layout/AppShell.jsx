import React, { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import GolfAppBar from "../GolfAppBar/GolfAppBar.jsx";
import GolfAppDrawer from "../GolfAppDrawer/GolfAppDrawer.jsx";

const DRAWER_WIDTH = 260;

const AppShell = ({}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // persistent open on desktop, closed by default on mobile
  const [open, setOpen] = useState(isDesktop);

  // if screen size changes, sync default behavior
  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  const handleToggle = useCallback(() => setOpen((v) => !v), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const onNavigateMobile = useCallback(() => {
    if (!isDesktop) setOpen(false);
  }, [isDesktop]);

  return (
    <Box sx={{ display: "flex" }}>
      <GolfAppBar onMenuClick={handleToggle} />

      <GolfAppDrawer
        open={open}
        onClose={handleClose}
        drawerWidth={DRAWER_WIDTH}
        variant={isDesktop ? "persistent" : "temporary"}
        onNavigate={onNavigateMobile}
      />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          // only shift content when drawer is persistent
          ml: isDesktop && open ? `${DRAWER_WIDTH}px` : 0,
          transition: (t) =>
            t.transitions.create("margin-left", {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.standard,
            }),
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppShell;
