import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import AdminOverview from "./AdminOverview";
import { useState } from "react";
import AdminRooms from "./AdminRooms";
import AdminBookings from "./AdminBookings";
import AdminPayments from "./AdminPayments";
import AdminUsers from "./AdminUsers";


const AdminDashboard = () => {
  const [selected, setSelected] = useState("overview");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar selected={selected} setSelected={setSelected} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {selected === "overview" && <AdminOverview />}
        {selected === "rooms" && <AdminRooms />}
        {selected === "bookings" && <AdminBookings />}
        {selected === "users" && <AdminUsers />}
        {selected === "payments" && <AdminPayments />}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
