import { Typography, Box, Grid, Paper } from "@mui/material";

export default function FrontDeskDashboard() {
  return (
    <Box>

      <Typography variant="h4" mb={3}>
        Front Desk Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Today's Check-ins</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Today's Check-outs</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Active Bookings</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
}