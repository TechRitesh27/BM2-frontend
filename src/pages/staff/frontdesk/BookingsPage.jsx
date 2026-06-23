import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Typography, Box, CircularProgress, Alert, TextField, MenuItem, Stack } from "@mui/material";
import BookingTable from "./components/BookingTable";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/staff/frontdesk/bookings");
      setBookings(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const filtered = filter === "ALL"
    ? bookings
    : bookings.filter(b => b.status === filter);

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Booking Management</Typography>
        <TextField
          select size="small" label="Filter" value={filter}
          onChange={e => setFilter(e.target.value)} sx={{ width: 160 }}
        >
          {["ALL", "BOOKED", "CHECKED_IN", "COMPLETED", "CANCELLED"].map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <BookingTable bookings={filtered} refresh={fetchBookings} />
    </Box>
  );
}
