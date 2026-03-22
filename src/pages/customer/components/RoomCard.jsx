import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import api from "../../../api/axios";

export default function RoomCard({ roomType, checkIn, checkOut }) {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [upgrade, setUpgrade] = useState(null);

  // Calculate nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    return (d2 - d1) / (1000 * 60 * 60 * 24);
  };

  const nights = getNights();
  const total = nights * roomType.price;

  // Open booking dialog
  const handleOpen = async () => {

    if (!checkIn || !checkOut) {
      alert("Select dates first");
      return;
    }

    try {
      const res = await api.post(
        "/api/guest/rooms/upgrade-suggestion",
        {
          roomTypeId: roomType.roomTypeId,
          checkIn,
          checkOut
        }
      );

      setUpgrade(res.data);
      setOpen(true);

    } catch (err) {
      console.error(err);
    }
  };

  // Confirm booking
  const confirmBooking = async () => {

    setLoading(true);

    try {

      let finalRoomType = roomType.roomTypeId;
      let upgradeAccepted = false;

      if (upgrade?.available) {
        finalRoomType = upgrade.roomTypeId;
        upgradeAccepted = true;
      }

      await api.post("/api/guest/rooms/book", {
        roomTypeId: finalRoomType,
        checkIn,
        checkOut,
        upgradeAccepted
      });

      alert("Booking successful!");
      setOpen(false);

    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardContent>

          <Typography variant="h6">
            {roomType.name}
          </Typography>

          <Typography>{roomType.description}</Typography>

          <Typography>
            Capacity: {roomType.capacity}
          </Typography>

          <Typography>
            Price: ₹{roomType.price} / night
          </Typography>

          <Typography>
            Available: {roomType.availableRooms}
          </Typography>

          <Stack mt={2}>
            <Button variant="contained" onClick={handleOpen}>
              Book Now
            </Button>
          </Stack>

        </CardContent>
      </Card>

      {/* BOOKING DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)}>

        <DialogTitle>Confirm Booking</DialogTitle>

        <DialogContent>

          <Typography>
            Room: {roomType.name}
          </Typography>

          <Typography>
            Nights: {nights}
          </Typography>

          <Typography>
            Price per night: ₹{roomType.price}
          </Typography>

          <Typography fontWeight="bold">
            Total: ₹{total}
          </Typography>

          {/* Upgrade Suggestion */}
          {upgrade?.available && (
            <Typography color="primary" mt={2}>
              Upgrade available → {upgrade.roomTypeName}
              <br />
              Extra: ₹{upgrade.priceDifference}/night
            </Typography>
          )}

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={confirmBooking}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm"}
          </Button>

        </DialogActions>

      </Dialog>
    </>
  );
}