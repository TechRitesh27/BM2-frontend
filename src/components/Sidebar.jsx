import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const staffType = localStorage.getItem("staffType");

  const commonMenu = [
    { label: "Pending Services", path: "/staff/pending" },
    { label: "My Assignments", path: "/staff/my-assignments" },
  ];

  const frontDeskMenu = [
    { label: "Dashboard", path: "/staff/frontdesk/dashboard" },
    { label: "Bookings", path: "/staff/frontdesk/bookings" },
  ];

  const housekeepingMenu = [
    { label: "Dashboard", path: "/staff/housekeeping/dashboard" },
    { label: "Rooms", path: "/staff/housekeeping/rooms" },
  ];

  let menu = [];

  if (staffType === "FRONT_DESK") menu = frontDeskMenu;
  else if (staffType === "HOUSEKEEPING") menu = housekeepingMenu;

  menu = [...menu, ...commonMenu];

  return (
    <Drawer variant="permanent">
      <List sx={{ width: 250 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}