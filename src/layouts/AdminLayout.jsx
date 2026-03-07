import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../pages/admin/components/AdminSidebar";

const AdminLayout = () => {

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      <AdminSidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh"
        }}
      >
        <Outlet />
      </Box>

    </Box>
  );
};

export default AdminLayout;