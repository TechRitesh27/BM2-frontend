import {
  Drawer, List, ListItemButton, ListItemText,
  ListItemIcon, Typography, Box, Divider, Button
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const drawerWidth = 240;

const menuItems = [
  { label: "Overview",         path: "/admin",          icon: <DashboardIcon /> },
  { label: "Rooms & Types",    path: "/admin/rooms",    icon: <MeetingRoomIcon /> },
  { label: "Bookings",         path: "/admin/bookings", icon: <BookOnlineIcon /> },
  { label: "Customers & Staff",path: "/admin/users",    icon: <PeopleIcon /> },
  { label: "Payments",         path: "/admin/payments", icon: <PaymentIcon /> },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

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
          display: "flex",
          flexDirection: "column",
        }
      }}
    >
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          Admin Panel
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
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={logout}
          color="inherit"
          sx={{ justifyContent: "flex-start", textTransform: "none" }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
