import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function StaffStatsCards({ data }) {
  const cards = [
    { label: "Pending Requests", value: data.pendingCount },
    { label: "Assigned To Me", value: data.assignedCount },
    { label: "Completed Today", value: data.completedToday },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={4} key={card.label}>
          <Card>
            <CardContent>
              <Typography variant="h6">{card.label}</Typography>
              <Typography variant="h4">{card.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}