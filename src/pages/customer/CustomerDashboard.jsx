import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress
} from "@mui/material";

export default function CustomerDashboard() {

  const [data, setData] = useState(null);

  const loadDashboard = async () => {
    const res = await api.get("/api/guest/dashboard");
    setData(res.data);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!data) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>

      <Typography variant="h4" mb={3}>
        Guest Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Active Stay
            </Typography>
            <Typography variant="h4">
              {data.activeBooking}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Total Bookings
            </Typography>
            <Typography variant="h4">
              {data.totalBookings}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Pending Services
            </Typography>
            <Typography variant="h4">
              {data.pendingServices}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Current Bill
            </Typography>
            <Typography variant="h4">
              ₹{data.currentBill}
            </Typography>
          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
}