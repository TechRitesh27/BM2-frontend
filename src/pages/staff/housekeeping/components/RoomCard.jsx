import { useState } from "react";
import {
  Card, CardContent, Typography, Button, Stack, Chip, Alert
} from "@mui/material";
import api from "../../../../api/axios";

const statusColor = {
  DIRTY: "error",
  CLEANING: "warning",
  MAINTENANCE: "default",
  AVAILABLE: "success",
};

export default function RoomCard({ room, refresh }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const call = async (endpoint) => {
    setLoading(true);
    setError("");
    try {
      await api.put(`/api/staff/housekeeping/${room.id}/${endpoint}`);
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Room {room.roomNumber}</Typography>
          <Chip
            label={room.status}
            color={statusColor[room.status] || "default"}
            size="small"
          />
        </Stack>

        <Typography variant="body2" color="text.secondary">Floor: {room.floor}</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Type: {room.roomType?.name}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 1 }} onClose={() => setError("")}>{error}</Alert>}

        <Stack spacing={1}>
          {room.status === "DIRTY" && (
            <Button
              variant="contained"
              color="warning"
              fullWidth
              disabled={loading}
              onClick={() => call("start-cleaning")}
            >
              Start Cleaning
            </Button>
          )}

          {room.status === "CLEANING" && (
            <Button
              variant="contained"
              color="success"
              fullWidth
              disabled={loading}
              onClick={() => call("mark-clean")}
            >
              Mark as Clean
            </Button>
          )}

          {(room.status === "DIRTY" || room.status === "CLEANING") && (
            <Button
              variant="outlined"
              color="error"
              fullWidth
              disabled={loading}
              onClick={() => call("mark-maintenance")}
            >
              Send to Maintenance
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
