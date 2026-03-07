import { Grid, Typography, Paper } from "@mui/material";

const AdminDashboard = () => {
  return (
    <>
      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Total Rooms</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Active Bookings</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Total Users</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2">Revenue</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;