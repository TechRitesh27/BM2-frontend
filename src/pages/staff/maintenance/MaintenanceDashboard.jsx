import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Box, Typography, Grid, Paper, CircularProgress, Alert, Button
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import { useNavigate } from "react-router-dom";

export default function MaintenanceDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get("/api/staff/dashboard"),
      api.get("/api/staff/maintenance/rooms")
    ])
      .then(([dashRes, roomRes]) => {
        const rooms = Array.isArray(roomRes.data) ? roomRes.data : [];
        setStats({
          ...dashRes.data,
          maintenanceRooms: rooms
        });
      })
      .catch(() => setError("Failed to load dashboard"));
  }, []);

  if (!stats) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" mb={3}>Maintenance Dashboard</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">Rooms Under Maintenance</Typography>
            <Typography variant="h3" color="error.main">
              {stats.roomsUnderMaintenance ?? stats.maintenanceRooms?.length ?? 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">My Assigned Services</Typography>
            <Typography variant="h3">{stats.myAssignedRequests ?? 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">Completed Today</Typography>
            <Typography variant="h3">{stats.completedToday ?? 0}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        startIcon={<BuildIcon />}
        onClick={() => navigate("/staff/maintenance/rooms")}
      >
        View Maintenance Rooms
      </Button>
    </Box>
  );
}
