import { Grid, Paper, Typography, Box } from "@mui/material";

export default function StaffStatsCards({ stats }) {
  const dept = stats?.departmentName || "";

  const commonCards = [
    { label: "Department",        value: dept || "--" },
    { label: "Pending Services",  value: stats?.pendingRequests      ?? "--" },
    { label: "My Assignments",    value: stats?.myAssignedRequests   ?? "--" },
    { label: "Completed Today",   value: stats?.completedToday       ?? "--" },
    {
      label: "Revenue Generated",
      value: stats?.serviceRevenueGenerated != null
        ? `₹${Number(stats.serviceRevenueGenerated).toLocaleString()}`
        : "--"
    },
  ];

  const deptCards = [];

  if (dept === "HOUSEKEEPING") {
    deptCards.push({ label: "Rooms Dirty",    value: stats?.roomsDirty    ?? "--", color: "error.main" });
    deptCards.push({ label: "Rooms Cleaning", value: stats?.roomsCleaning ?? "--", color: "warning.main" });
  }

  if (dept === "MAINTENANCE") {
    deptCards.push({ label: "Rooms Under Maintenance", value: stats?.roomsUnderMaintenance ?? "--", color: "warning.main" });
  }

  const allCards = [...deptCards, ...commonCards];

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        {dept ? `${dept.replace("_", " ")} Dashboard` : "Staff Dashboard"}
      </Typography>
      <Grid container spacing={3}>
        {allCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.label}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h4" mt={1} color={card.color || "text.primary"}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
