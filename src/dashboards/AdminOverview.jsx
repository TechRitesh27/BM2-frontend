import { Grid, Paper, Typography } from "@mui/material";

const StatCard = ({ title, value }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

const AdminOverview = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Rooms" value="--" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Bookings" value="--" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Staff Members" value="--" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Revenue" value="--" />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminOverview;
