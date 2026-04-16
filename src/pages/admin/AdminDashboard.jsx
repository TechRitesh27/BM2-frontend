import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Box,
  Alert
} from "@mui/material";
import RevenueChart from "./components/RevenueChart";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch(() => setError("Failed to load dashboard stats"));

    api.get("/api/admin/dashboard/revenue-trend")
      .then((res) => setRevenue(res.data || []))
      .catch(() => {});
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;

  if (!stats) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Total Rooms</Typography>
            <Typography variant="h4">{stats.totalRooms}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Active Bookings</Typography>
            <Typography variant="h4">{stats.activeBookings}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Total Guests</Typography>
            <Typography variant="h4">{stats.totalUsers}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Total Revenue</Typography>
            <Typography variant="h4">₹{stats.totalRevenue?.toLocaleString()}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {revenue.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>Revenue Trend (Last 12 Months)</Typography>
          <RevenueChart data={revenue.map((r) => ({ date: r.month, revenue: r.revenue }))} />
        </Paper>
      )}
    </>
  );
};

export default AdminDashboard;
