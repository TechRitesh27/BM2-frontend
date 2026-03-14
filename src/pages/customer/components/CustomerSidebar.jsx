import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function CustomerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/customer",
    },

    {
      label: "Search Rooms",
      path: "/customer/rooms",
    },

    {
      label: "My Bookings",
      path: "/customer/bookings",
    },

    // {
    //   label: "Request Service",
    //   path: "/customer/request-service"
    // },

    // {
    //   label: "My Services",
    //   path: "/customer/services"
    // },

    { label: "My Services", path: "/customer/services" }, // NEW

    {
      label: "My Bill",
      path: "/customer/bill",
    },
  ];

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #eee",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          Guest Panel
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={isActive(item.path)}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
