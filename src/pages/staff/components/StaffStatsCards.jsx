import { Grid, Paper, Typography, Box } from "@mui/material";

export default function StaffStatsCards({ stats }) {
  const cards = [
    { label: "Pending Services",   value: stats?.pendingRequests      ?? stats?.pendingServices      ?? "--" },
    { label: "My Assignments",     value: stats?.myAssignedRequests   ?? stats?.assignedServices     ?? "--" },
    { label: "Completed Today",    value: stats?.completedToday                                      ?? "--" },
    { label: "Revenue Generated",  value: stats?.serviceRevenueGenerated != null
                                           ? `₹${stats.serviceRevenueGenerated.toLocaleString()}`
                                           : "--" },
    { label: "Department",         value: stats?.departmentName                                      ?? "--" },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} md={4} key={card.label}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {card.label}
            </Typography>
            <Typography variant="h4" mt={1}>
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
