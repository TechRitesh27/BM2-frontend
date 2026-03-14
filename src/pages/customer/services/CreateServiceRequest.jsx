import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from "@mui/material";

export default function CreateServiceRequest({
  open,
  onClose,
  onSaved
}) {

  const [serviceTypes, setServiceTypes] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [bookingId, setBookingId] = useState("");
  const [serviceTypeId, setServiceTypeId] = useState("");

  useEffect(() => {

    if (!open) return;

    api.get("/api/service-types")
      .then(res => setServiceTypes(res.data || []));

    api.get("/api/guest/account/bookings")
      .then(res => setBookings(res.data || []));

  }, [open]);

  const handleSubmit = async () => {

    await api.post("/api/guest/services", {
      bookingId,
      serviceTypeId
    });

    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>

      <DialogTitle>Request Service</DialogTitle>

      <DialogContent>

        <TextField
          select
          fullWidth
          label="Booking"
          margin="normal"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        >

          {bookings.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              Booking #{b.id} – Room {b.room?.roomNumber}
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
              {s.name} – ₹{s.price}
            </MenuItem>
          ))}

        </TextField>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Request
        </Button>

      </DialogActions>

    </Dialog>
  );
}