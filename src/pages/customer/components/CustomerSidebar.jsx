import {
  Drawer, List, ListItemButton, ListItemText,
  Typography, Box, Divider, ListItemIcon
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { label: "Dashboard",     path: "/customer",          icon: <DashboardIcon /> },
  { label: "Search Rooms",  path: "/customer/rooms",    icon: <SearchIcon /> },
  { label: "My Bookings",   path: "/customer/bookings", icon: <BookOnlineIcon /> },
  { label: "My Services",   path: "/customer/services", icon: <RoomServiceIcon /> },
  { label: "My Bill",       path: "/customer/bill",     icon: <ReceiptIcon /> },
  { label: "Profile",       path: "/customer/profile",  icon: <AccountCircleIcon /> },
];

export default function CustomerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

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
        <Divider sx={{ mb: 1 }} />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={isActive(item.path)}
              onClick={() => navigate(item.path)}
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
