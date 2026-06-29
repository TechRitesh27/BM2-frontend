import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Box, Typography, Grid, Card, CardContent, Button, Stack,
  Chip, CircularProgress, Alert
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

export default function MaintenanceRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/staff/maintenance/rooms");
      setRooms(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleAction = async (roomId, endpoint, label) => {
    setActionLoading(roomId + endpoint);
    try {
      await api.put(`/api/staff/maintenance/${roomId}/${endpoint}`);
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${label}`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h5" mb={3}>Rooms Under Maintenance</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      {rooms.length === 0 && !error && (
        <Alert severity="success">No rooms currently under maintenance. All clear!</Alert>
      )}

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6">Room {room.roomNumber}</Typography>
                  <Chip label="MAINTENANCE" color="warning" size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary">Floor: {room.floor}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Type: {room.roomType?.name}
                </Typography>

                <Stack spacing={1}>
                  {/* Fixed and ready for guests */}
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    startIcon={<CheckCircleIcon />}
                    disabled={actionLoading === room.id + "mark-fixed"}
                    onClick={() => handleAction(room.id, "mark-fixed", "mark fixed")}
                  >
                    {actionLoading === room.id + "mark-fixed" ? "Saving..." : "Mark as Fixed (Available)"}
                  </Button>

                  {/* Fixed but needs housekeeping first */}
                  <Button
                    variant="outlined"
                    color="warning"
                    fullWidth
                    startIcon={<CleaningServicesIcon />}
                    disabled={actionLoading === room.id + "needs-cleaning"}
                    onClick={() => handleAction(room.id, "needs-cleaning", "send to housekeeping")}
                  >
                    {actionLoading === room.id + "needs-cleaning" ? "Saving..." : "Fixed → Needs Cleaning"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
