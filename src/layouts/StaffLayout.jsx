import { Box } from "@mui/material";
import StaffSidebar from "../components/StaffSidebar";
import { Outlet } from "react-router-dom";

export default function StaffLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <StaffSidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}