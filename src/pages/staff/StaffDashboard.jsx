import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Box, CircularProgress, Alert } from "@mui/material";
import StaffStatsCards from "./components/StaffStatsCards";

export default function StaffDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/staff/dashboard")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load dashboard"));
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;

  if (!data) return (
    <Box textAlign="center" mt={5}><CircularProgress /></Box>
  );

  return <StaffStatsCards stats={data} />;
}
