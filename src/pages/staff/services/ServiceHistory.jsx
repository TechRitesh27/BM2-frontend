import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Box, CircularProgress, Chip, Paper, Alert
} from "@mui/material";

const statusColor = { COMPLETED: "success", REJECTED: "error" };

export default function ServiceHistory() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/staff/services/history")
      .then(res => setServices(Array.isArray(res.data) ? res.data : []))
      .catch(err => setError(err.response?.data?.message || "Failed to fetch history"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h5" mb={3}>Service History</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 1 }}>
        {services.length === 0 && !error ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            No service history yet.
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
                <TableCell>Completed / Rejected At</TableCell>
                <TableCell>Rejection Reason</TableCell>
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
                    {s.completedAt ? new Date(s.completedAt).toLocaleString() : "—"}
                  </TableCell>
                  <TableCell>{s.rejectionReason || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}
