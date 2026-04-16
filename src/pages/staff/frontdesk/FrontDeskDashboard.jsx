import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Typography, Box, Grid, Paper, CircularProgress } from "@mui/material";

export default function FrontDeskDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/api/staff/frontdesk/bookings")
      .then((res) => {
        const bookings = Array.isArray(res.data) ? res.data : [];
        const today = new Date().toISOString().split("T")[0];

        setStats({
          todayCheckIns: bookings.filter(
            (b) => b.status === "BOOKED" && b.checkIn === today
          ).length,
          todayCheckOuts: bookings.filter(
            (b) => b.status === "CHECKED_IN" && b.checkOut === today
          ).length,
          activeBookings: bookings.filter((b) => b.status === "CHECKED_IN").length
        });
      })
      .catch((err) => console.error("Failed to load front desk stats", err));
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
        Front Desk Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Today's Check-ins</Typography>
            <Typography variant="h4">{stats.todayCheckIns}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Today's Check-outs</Typography>
            <Typography variant="h4">{stats.todayCheckOuts}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Active Bookings</Typography>
            <Typography variant="h4">{stats.activeBookings}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
