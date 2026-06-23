import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Typography, Box, CircularProgress, Stack,
  Chip, Paper, Alert, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, TextField
} from "@mui/material";

const statusColor = { ASSIGNED: "info", COMPLETED: "success", REJECTED: "error" };

export default function MyAssignments() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rejectDialog, setRejectDialog] = useState({ open: false, id: null });
  const [reason, setReason] = useState("");

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/staff/services/my-assignments");
      setServices(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch assignments");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAssignments(); }, []);

  const handleComplete = async (id) => {
    setError("");
    try {
      await api.put(`/api/staff/services/${id}/complete`);
      fetchAssignments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete service");
    }
  };

  const openReject = (id) => {
    setReason("");
    setRejectDialog({ open: true, id });
  };

  const handleReject = async () => {
    if (!reason.trim()) return;
    setError("");
    try {
      await api.put(`/api/staff/services/${rejectDialog.id}/reject?reason=${encodeURIComponent(reason)}`);
      setRejectDialog({ open: false, id: null });
      fetchAssignments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject service");
    }
  };

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h5" mb={3}>My Assigned Services</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      <Paper sx={{ p: 1 }}>
        {services.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            No assignments yet.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Guest</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Requested At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>#{s.id}</TableCell>
                  <TableCell>{s.serviceType?.name}</TableCell>
                  <TableCell>{s.user?.name}</TableCell>
                  <TableCell>{s.booking?.room?.roomNumber || "—"}</TableCell>
                  <TableCell>
                    <Chip
                      label={s.status}
                      color={statusColor[s.status] || "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {s.requestedAt ? new Date(s.requestedAt).toLocaleString() : "—"}
                  </TableCell>
                  <TableCell>
                    {s.status === "ASSIGNED" && (
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="contained" color="success"
                          onClick={() => handleComplete(s.id)}>
                          Complete
                        </Button>
                        <Button size="small" variant="outlined" color="error"
                          onClick={() => openReject(s.id)}>
                          Reject
                        </Button>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onClose={() => setRejectDialog({ open: false, id: null })}>
        <DialogTitle>Reject Service Request</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            Please provide a reason for rejection.
          </DialogContentText>
          <TextField
            fullWidth
            label="Reason"
            value={reason}
            onChange={e => setReason(e.target.value)}
            multiline
            rows={2}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialog({ open: false, id: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleReject} disabled={!reason.trim()}>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
