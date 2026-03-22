import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const drawerWidth = 240;

const StaffSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const staffType = user?.staffType;

  const menu = [
    {
      label: "Dashboard",
      path: "/staff/dashboard",
    },
    {
      label: "Pending Services",
      path: "/staff/pending",
    },
    {
      label: "My Assignments",
      path: "/staff/my-assignments",
    },
    {
      label: "Service History",
      path: "/staff/services/history",
    },
  ];

  // Front desk features
  if (staffType === "FRONT_DESK") {
    menu.push({
      label: "Bookings",
      path: "/staff/frontdesk/bookings",
    });
  }

  if (staffType === "FRONT_DESK") {
    menu.push({
      label: "QR Scanner",
      path: "/staff/frontdesk/qr",
    });
  }


  // Housekeeping features
  if (staffType === "HOUSEKEEPING") {
    menu.push({
      label: "Room Cleaning",
      path: "/staff/housekeeping/rooms",
    });
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          Staff Panel
        </Typography>

        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname === item.path}
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

export default StaffSidebar;
