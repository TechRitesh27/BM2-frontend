import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Box
} from "@mui/material";

const AdminDashboard = () => {

  const [stats, setStats] = useState(null);

  const loadDashboard = async () => {
    const res = await api.get("/api/admin/dashboard");
    setStats(res.data);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

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

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Total Rooms</Typography>
            <Typography variant="h4">
              {stats.totalRooms}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Active Bookings</Typography>
            <Typography variant="h4">
              {stats.activeBookings}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Total Users</Typography>
            <Typography variant="h4">
              {stats.totalUsers}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Revenue</Typography>
            <Typography variant="h4">
              ₹{stats.totalRevenue}
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </>
  );
};

export default AdminDashboard;