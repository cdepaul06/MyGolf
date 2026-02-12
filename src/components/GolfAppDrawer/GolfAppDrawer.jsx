import React from "react";
import { NavLink } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
  { to: "/app/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { to: "/app/clubs", label: "Clubs", icon: <SportsGolfIcon /> },
  { to: "/app/rounds", label: "Rounds", icon: <GolfCourseIcon /> },
  { to: "/app/courses", label: "Courses", icon: <MapIcon /> },
  { to: "/app/settings", label: "Settings", icon: <SettingsIcon /> },
];

const GolfAppDrawer = ({ open, onClose, drawerWidth, variant, onNavigate }) => {
  const appBarHeight = 64; // default MUI AppBar height

  return (
    <Drawer
      variant={variant} // "persistent" or "temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }} // smoother mobile performance
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: `${appBarHeight}px`,
          height: `calc(100% - ${appBarHeight}px)`,
        },
      }}
    >
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            onClick={onNavigate} // ✅ close drawer after nav on mobile
            sx={{
              "&.active": {
                bgcolor: "action.selected",
                "& .MuiListItemIcon-root": { color: "primary.main" },
                "& .MuiListItemText-primary": { fontWeight: 700 },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default GolfAppDrawer;
