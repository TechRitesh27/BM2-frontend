import {
  Drawer, List, ListItemButton, ListItemText, ListItemIcon,
  Typography, Box, Divider, Button
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import BuildIcon from "@mui/icons-material/Build";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const drawerWidth = 240;

// Returns the correct dashboard path per staff type
const getDashboardPath = (staffType) => {
  if (staffType === "FRONT_DESK")  return "/staff/frontdesk/dashboard";
  if (staffType === "HOUSEKEEPING") return "/staff/housekeeping/dashboard";
  if (staffType === "MAINTENANCE")  return "/staff/maintenance/dashboard";
  return "/staff/dashboard";
};

const StaffSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const staffType = user?.staffType;

  const dashboardPath = getDashboardPath(staffType);

  // Base menu — dashboard path is always correct for this staff type
  const menu = [
    { label: "Dashboard",        path: dashboardPath,             icon: <DashboardIcon /> },
    { label: "Pending Services",  path: "/staff/pending",          icon: <PendingActionsIcon /> },
    { label: "My Assignments",    path: "/staff/my-assignments",   icon: <AssignmentIcon /> },
    { label: "Service History",   path: "/staff/services/history", icon: <HistoryIcon /> },
  ];

  // Department-specific items
  if (staffType === "FRONT_DESK") {
    menu.push({ label: "Bookings",   path: "/staff/frontdesk/bookings", icon: <BookOnlineIcon /> });
    menu.push({ label: "QR Scanner", path: "/staff/frontdesk/qr",       icon: <QrCodeScannerIcon /> });
  }

  if (staffType === "HOUSEKEEPING") {
    menu.push({ label: "Room Cleaning",  path: "/staff/housekeeping/rooms", icon: <CleaningServicesIcon /> });
  }

  if (staffType === "MAINTENANCE") {
    menu.push({ label: "Maintenance Rooms", path: "/staff/maintenance/rooms", icon: <BuildIcon /> });
  }

  // Profile always last
  menu.push({ label: "My Profile", path: "/staff/profile", icon: <AccountCircleIcon /> });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          Staff Panel
        </Typography>
        {staffType && (
          <Typography variant="caption" align="center" display="block"
            color="text.secondary" mb={1}>
            {staffType.replace("_", " ")}
          </Typography>
        )}
        <Divider sx={{ mb: 1 }} />
        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.path}
              selected={
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/")
              }
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

export default StaffSidebar;
