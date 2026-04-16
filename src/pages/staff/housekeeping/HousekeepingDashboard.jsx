import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Typography, Grid, Paper, Box, CircularProgress } from "@mui/material";

export default function HousekeepingDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/api/staff/housekeeping/rooms")
      .then((res) => {
        const rooms = Array.isArray(res.data) ? res.data : [];
        setStats({
          toClean: rooms.filter((r) => r.status === "DIRTY").length,
          cleaning: rooms.filter((r) => r.status === "CLEANING").length,
          maintenance: rooms.filter((r) => r.status === "MAINTENANCE").length
        });
      })
      .catch((err) => console.error("Failed to load housekeeping stats", err));
  }, []);

  if (!stats) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Housekeeping Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Rooms To Clean</Typography>
            <Typography variant="h4">{stats.toClean}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Currently Cleaning</Typography>
            <Typography variant="h4">{stats.cleaning}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Maintenance Required</Typography>
            <Typography variant="h4">{stats.maintenance}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
