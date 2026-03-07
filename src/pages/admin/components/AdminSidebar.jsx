import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { label: "Overview", path: "/admin" },
  { label: "Rooms & Types", path: "/admin/rooms" },
  { label: "Bookings", path: "/admin/bookings" },
  { label: "Customers & Staff", path: "/admin/users" },
  { label: "Payments", path: "/admin/payments" }
];

const AdminSidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
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
          borderRight: "1px solid #eee"
        }
      }}
    >

      <Box sx={{ p: 2 }}>

        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          Admin Panel
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
};

export default AdminSidebar;