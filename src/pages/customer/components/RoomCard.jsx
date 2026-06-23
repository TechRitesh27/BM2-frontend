import { useState } from "react";
import {
  Card, CardMedia, CardContent, Typography, Button, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Chip, Box, Alert
} from "@mui/material";
import api from "../../../api/axios";

export default function RoomCard({ roomType, checkIn, checkOut }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [upgrade, setUpgrade] = useState(null);
  const [acceptUpgrade, setAcceptUpgrade] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const nights = checkIn && checkOut
    ? Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  const baseTotal = nights * roomType.price;
  const upgradeTotal = upgrade?.available
    ? nights * (roomType.price + upgrade.priceDifference)
    : baseTotal;

  const handleOpen = async () => {
    if (!checkIn || !checkOut) { alert("Please select dates first"); return; }
    setError("");
    setAcceptUpgrade(false);
    try {
      const res = await api.post("/api/guest/rooms/upgrade-suggestion", {
        roomTypeId: roomType.roomTypeId,
        checkIn,
        checkOut
      });
      setUpgrade(res.data);
    } catch {
      setUpgrade({ available: false });
    }
    setOpen(true);
  };

  const confirmBooking = async () => {
    setLoading(true);
    setError("");
    try {
      const finalRoomTypeId = acceptUpgrade && upgrade?.available
        ? upgrade.roomTypeId
        : roomType.roomTypeId;

      await api.post("/api/guest/rooms/book", {
        roomTypeId: finalRoomTypeId,
        checkIn,
        checkOut,
        upgradeAccepted: acceptUpgrade && upgrade?.available
      });

      setSuccess(true);
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card>
        <CardContent>
          <Alert severity="success">
            Booking confirmed! Check your email for details.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {roomType.imageUrl && (
          <CardMedia
            component="img"
            height="160"
            image={roomType.imageUrl}
            alt={roomType.name}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>{roomType.name}</Typography>
          {roomType.description && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {roomType.description}
            </Typography>
          )}
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
            {roomType.bedType && <Chip label={roomType.bedType} size="small" />}
            {roomType.capacity && <Chip label={`${roomType.capacity} guests`} size="small" />}
            {roomType.roomSize && <Chip label={`${roomType.roomSize} m²`} size="small" />}
          </Stack>
          {roomType.amenities && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {roomType.amenities}
            </Typography>
          )}
          <Typography variant="h6" color="primary" mt={1}>
            ₹{roomType.price?.toLocaleString()} / night
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {roomType.availableRooms} room(s) available
          </Typography>
          {nights > 0 && (
            <Typography variant="body2" mt={1}>
              <b>Estimated total: ₹{baseTotal.toLocaleString()}</b> ({nights} nights)
            </Typography>
          )}
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button variant="contained" fullWidth onClick={handleOpen}>
            Book Now
          </Button>
        </Box>
      </Card>

      {/* Booking Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Typography><b>Room Type:</b> {roomType.name}</Typography>
          <Typography><b>Check-In:</b> {checkIn}</Typography>
          <Typography><b>Check-Out:</b> {checkOut}</Typography>
          <Typography><b>Nights:</b> {nights}</Typography>
          <Typography><b>Price/night:</b> ₹{roomType.price?.toLocaleString()}</Typography>
          <Typography variant="h6" mt={1}>
            Total: ₹{baseTotal.toLocaleString()}
          </Typography>

          {/* Upgrade Suggestion */}
          {upgrade?.available && (
            <Box mt={2} p={2} sx={{ border: "1px solid", borderColor: "primary.main", borderRadius: 1 }}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                ✨ Upgrade Available!
              </Typography>
              <Typography variant="body2">
                Upgrade to <b>{upgrade.roomTypeName}</b> for just ₹{upgrade.priceDifference?.toLocaleString()} more/night
              </Typography>
              <Typography variant="body2" mt={0.5}>
                Upgraded total: ₹{upgradeTotal.toLocaleString()}
              </Typography>
              <Stack direction="row" spacing={1} mt={1.5}>
                <Button
                  size="small"
                  variant={acceptUpgrade ? "contained" : "outlined"}
                  onClick={() => setAcceptUpgrade(true)}
                >
                  Yes, Upgrade
                </Button>
                <Button
                  size="small"
                  variant={!acceptUpgrade ? "contained" : "outlined"}
                  color="inherit"
                  onClick={() => setAcceptUpgrade(false)}
                >
                  No Thanks
                </Button>
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Back</Button>
          <Button variant="contained" onClick={confirmBooking} disabled={loading}>
            {loading ? "Booking..." : `Confirm — ₹${(acceptUpgrade && upgrade?.available ? upgradeTotal : baseTotal).toLocaleString()}`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
