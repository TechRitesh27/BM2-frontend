import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Paper, Button, Chip, Stack, TextField, MenuItem
} from "@mui/material";

const statusColors = {
  BOOKED: "primary",
  CHECKED_IN: "success",
  COMPLETED: "default",
  CANCELLED: "error",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const fetchBookings = async () => {
    const res = await api.get("/api/admin/bookings");
    setBookings(res.data || []);
  };

  const checkIn = async (id) => {
    try {
      await api.put(`/api/admin/bookings/${id}/check-in`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Check-in failed");
    }
  };

  const checkOut = async (id) => {
    try {
      await api.put(`/api/admin/bookings/${id}/check-out`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Check-out failed");
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await api.put(`/api/admin/bookings/${id}/cancel`);
    fetchBookings();
  };

  useEffect(() => { fetchBookings(); }, []);

  const filtered = filter === "ALL"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Bookings Management</Typography>
        <TextField
          select
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: 160 }}
          label="Filter by Status"
        >
          {["ALL", "BOOKED", "CHECKED_IN", "COMPLETED", "CANCELLED"].map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Guest</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Check-In</TableCell>
            <TableCell>Check-Out</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} align="center">No bookings found</TableCell>
            </TableRow>
          )}
          {filtered.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.user?.name}<br /><small>{b.user?.email}</small></TableCell>
              <TableCell>{b.room?.roomNumber} ({b.room?.roomType?.name})</TableCell>
              <TableCell>{b.checkIn}</TableCell>
              <TableCell>{b.checkOut}</TableCell>
              <TableCell>₹{b.totalAmount?.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={b.paymentStatus || "PENDING"}
                  color={b.paymentStatus === "PAID" ? "success" : "default"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={b.status}
                  color={statusColors[b.status] || "default"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {b.status === "BOOKED" && (
                    <Button size="small" variant="contained" onClick={() => checkIn(b.id)}>
                      Check-In
                    </Button>
                  )}
                  {b.status === "CHECKED_IN" && (
                    <Button size="small" variant="contained" color="success" onClick={() => checkOut(b.id)}>
                      Check-Out
                    </Button>
                  )}
                  {(b.status === "BOOKED" || b.status === "CHECKED_IN") && (
                    <Button size="small" color="error" onClick={() => cancelBooking(b.id)}>
                      Cancel
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
};

export default AdminBookings;
