import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Stack, Chip, Paper, Alert, Typography
} from "@mui/material";
import api from "../../../../api/axios";

const statusColor = {
  BOOKED: "primary",
  CHECKED_IN: "success",
  COMPLETED: "default",
  CANCELLED: "error",
};

export default function BookingTable({ bookings = [], refresh }) {
  const [error, setError] = useState("");

  const handleAction = async (id, action) => {
    setError("");
    try {
      await api.put(`/api/staff/frontdesk/bookings/${id}/${action}`);
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${action}`);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Guest</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Check-In</TableCell>
            <TableCell>Check-Out</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography color="text.secondary">No bookings found</Typography>
              </TableCell>
            </TableRow>
          )}
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>#{b.id}</TableCell>
              <TableCell>
                {b.user?.name}<br />
                <small style={{ color: "#666" }}>{b.user?.email}</small>
              </TableCell>
              <TableCell>{b.room?.roomNumber} ({b.room?.roomType?.name})</TableCell>
              <TableCell>{b.checkIn}</TableCell>
              <TableCell>{b.checkOut}</TableCell>
              <TableCell>₹{b.totalAmount?.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={b.status}
                  color={statusColor[b.status] || "default"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  {b.status === "BOOKED" && (
                    <Button size="small" variant="contained"
                      onClick={() => handleAction(b.id, "check-in")}>
                      Check-In
                    </Button>
                  )}
                  {b.status === "CHECKED_IN" && (
                    <Button size="small" variant="contained" color="success"
                      onClick={() => handleAction(b.id, "check-out")}>
                      Check-Out
                    </Button>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
