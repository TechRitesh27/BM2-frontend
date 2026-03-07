import { Grid, Paper, Typography } from "@mui/material";

export default function StaffStatsCards({ stats }) {

  return (

    <Grid container spacing={3}>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Pending Services</Typography>
          <Typography variant="h4">
            {stats?.pendingServices ?? "--"}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Assigned Services</Typography>
          <Typography variant="h4">
            {stats?.assignedServices ?? "--"}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Completed Today</Typography>
          <Typography variant="h4">
            {stats?.completedToday ?? "--"}
          </Typography>
        </Paper>
      </Grid>

    </Grid>

  );

}