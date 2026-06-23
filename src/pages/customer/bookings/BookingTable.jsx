import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Button, Stack, Chip, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import api from "../../../api/axios";

const statusColor = {
  BOOKED: "primary",
  CHECKED_IN: "success",
  COMPLETED: "default",
  CANCELLED: "error",
};

export default function BookingTable({ bookings, onRefresh }) {
  const [cancelId, setCancelId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const downloadQR = (id) => {
    const canvas = document.getElementById(`qr-${id}`);
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `booking-${id}.png`;
    link.click();
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await api.put(`/api/guest/rooms/${cancelId}/cancel`);
      setCancelId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || "Cancellation failed");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
            {bookings.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.id}</TableCell>
                <TableCell>
                  {b.room?.roomNumber} ({b.room?.roomType?.name})
                </TableCell>
                <TableCell>{b.checkIn}</TableCell>
                <TableCell>{b.checkOut}</TableCell>
                <TableCell>
                  <Chip
                    label={b.status}
                    color={statusColor[b.status] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>₹{b.totalAmount?.toLocaleString()}</TableCell>
                <TableCell>
                  {b.qrToken && b.status === "BOOKED" ? (
                    <Stack alignItems="center" spacing={0.5}>
                      <QRCodeCanvas
                        id={`qr-${b.id}`}
                        value={`BOOKING:${b.qrToken}`}
                        size={80}
                      />
                      <Button size="small" variant="outlined" onClick={() => downloadQR(b.id)}>
                        Download
                      </Button>
                    </Stack>
                  ) : "—"}
                </TableCell>
                <TableCell>
                  {b.status === "BOOKED" && (
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => setCancelId(b.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={!!cancelId} onClose={() => setCancelId(null)}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel Booking #{cancelId}? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelId(null)}>Keep Booking</Button>
          <Button color="error" onClick={handleCancel} disabled={cancelling}>
            {cancelling ? "Cancelling..." : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
