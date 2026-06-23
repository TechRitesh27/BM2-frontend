import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Alert, CircularProgress
} from "@mui/material";

export default function CreateServiceRequest({ open, onClose, onSaved }) {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [serviceTypeId, setServiceTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    setError("");
    setBookingId("");
    setServiceTypeId("");

    api.get("/api/service-types")
      .then(res => setServiceTypes(res.data || []))
      .catch(() => setError("Failed to load service types"));

    api.get("/api/guest/account/bookings")
      .then(res => {
        // Only show CHECKED_IN bookings — services only work during active stay
        const active = (res.data || []).filter(b => b.status === "CHECKED_IN");
        setBookings(active);
      })
      .catch(() => setError("Failed to load bookings"));
  }, [open]);

  const handleSubmit = async () => {
    if (!bookingId || !serviceTypeId) {
      setError("Please select both a booking and a service type");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/api/guest/services", {
        bookingId: Number(bookingId),
        serviceTypeId: Number(serviceTypeId)
      });
      onSaved();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit service request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Request a Service</DialogTitle>

      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {bookings.length === 0 && !error && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No active stay found. Services can only be requested while checked in.
          </Alert>
        )}

        <TextField
          select
          fullWidth
          label="Your Active Booking"
          margin="normal"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          disabled={bookings.length === 0}
        >
          {bookings.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              Booking #{b.id} — Room {b.room?.roomNumber} ({b.room?.roomType?.name})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Service Type"
          margin="normal"
          value={serviceTypeId}
          onChange={(e) => setServiceTypeId(e.target.value)}
        >
          {serviceTypes.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name} — ₹{s.price?.toLocaleString()}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || bookings.length === 0}
        >
          {loading ? <CircularProgress size={20} /> : "Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
