import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Box, CircularProgress } from "@mui/material";
import StaffStatsCards from "./components/StaffStatsCards";

export default function StaffDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/api/staff/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to load staff dashboard", err));
  }, []);

  if (!data) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return <StaffStatsCards stats={data} />;
}
