import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StaffSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", path: "/staff/dashboard" },
    { text: "Pending Requests", path: "/staff/pending" },
    { text: "My Assignments", path: "/staff/my-assignments" },
  ];

  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}