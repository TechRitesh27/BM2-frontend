import { Typography, Grid, Paper, Box } from "@mui/material";

export default function HousekeepingDashboard() {

  return (

    <Box>

      <Typography variant="h4" mb={3}>
        Housekeeping Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Rooms To Clean</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Rooms Cleaned Today</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Maintenance Required</Typography>
            <Typography variant="h4">--</Typography>
          </Paper>
        </Grid>

      </Grid>

    </Box>

  );
}