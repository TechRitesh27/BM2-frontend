import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Chip, Alert, Paper, Typography
} from "@mui/material";
import api from "../../../api/axios";

const statusColor = {
  PENDING:   "warning",
  ASSIGNED:  "info",
  COMPLETED: "success",
  REJECTED:  "error",
  CANCELLED: "default",
};

export default function ServiceTable({ services = [], showAssign = false, refresh }) {
  const [error, setError] = useState("");

  const handleAssign = async (id) => {
    setError("");
    try {
      await api.put(`/api/staff/services/${id}/assign`);
      if (refresh) refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign service");
    }
  };

  return (
    <Paper sx={{ p: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>
      )}
      {services.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={3}>
          No service requests found.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Guest</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Requested</TableCell>
              {showAssign && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell>#{s.id}</TableCell>
                <TableCell>{s.serviceType?.name}</TableCell>
                <TableCell>₹{s.serviceType?.price?.toLocaleString()}</TableCell>
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
                {showAssign && (
                  <TableCell>
                    {s.status === "PENDING" && (
                      <Button size="small" variant="contained"
                        onClick={() => handleAssign(s.id)}>
                        Assign to Me
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
