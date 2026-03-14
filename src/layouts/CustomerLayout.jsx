import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../pages/customer/components/CustomerSidebar";

export default function CustomerLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      <CustomerSidebar />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>

    </Box>
  );
}