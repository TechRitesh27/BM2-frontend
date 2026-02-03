import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box
} from "@mui/material";

const drawerWidth = 240;

const AdminSidebar = ({ selected, setSelected }) => {
  const menuItems = [
    { key: "overview", label: "Overview" },
    { key: "rooms", label: "Rooms & Types" },
    { key: "bookings", label: "Bookings" },
    { key: "users", label: "Customers & Staff" },
    { key: "payments", label: "Payments" }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          Admin Panel
        </Typography>
        <List>
          {menuItems.map(item => (
            <ListItem
              button
              key={item.key}
              selected={selected === item.key}
              onClick={() => setSelected(item.key)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
