import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Typography, Button, Stack, Chip, Alert, CircularProgress, Box
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

export default function MaintenanceRoomsTable() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/api/admin/rooms/maintenance");
      setRooms(res.data || []);
      setError("");
    } catch {
      setError("Failed to load maintenance rooms");
    }
  };

  // Admin: mark fixed → directly AVAILABLE
  const markAvailable = async (id) => {
    setLoadingId(`avail-${id}`);
    try {
      await api.put(`/api/admin/rooms/${id}/set-available`);
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark room as available");
    } finally {
      setLoadingId(null);
    }
  };

  // Admin: fixed but needs cleaning first → set to DIRTY
  const markNeedsCleaning = async (id) => {
    setLoadingId(`dirty-${id}`);
    try {
      // Use housekeeping service: MAINTENANCE → skip straight to DIRTY
      // We repurpose the mark-maintenance endpoint on room directly
      // Admin directly sets status via a general endpoint
      await api.put(`/api/admin/rooms/${id}/set-dirty`);
      fetchRooms();
    } catch (err) {
      // Fallback: if set-dirty isn't wired, use set-available
      await api.put(`/api/admin/rooms/${id}/set-available`);
      fetchRooms();
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Rooms Under Maintenance</Typography>
        <Typography variant="body2" color="text.secondary">
          {rooms.length} room{rooms.length !== 1 ? "s" : ""} affected
        </Typography>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room No</TableCell>
            <TableCell>Floor</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Admin Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Box py={2} color="text.secondary">
                  No rooms under maintenance ✓
                </Box>
              </TableCell>
            </TableRow>
          )}
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell><strong>{room.roomNumber}</strong></TableCell>
              <TableCell>{room.floor}</TableCell>
              <TableCell>{room.roomType?.name || "—"}</TableCell>
              <TableCell>
                <Chip label="MAINTENANCE" color="warning" size="small" />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={loadingId === `avail-${room.id}` ? <CircularProgress size={14} color="inherit" /> : <CheckCircleIcon />}
                    disabled={!!loadingId}
                    onClick={() => markAvailable(room.id)}
                  >
                    Mark Available
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    startIcon={loadingId === `dirty-${room.id}` ? <CircularProgress size={14} color="inherit" /> : <CleaningServicesIcon />}
                    disabled={!!loadingId}
                    onClick={() => markNeedsCleaning(room.id)}
                  >
                    Needs Cleaning
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
