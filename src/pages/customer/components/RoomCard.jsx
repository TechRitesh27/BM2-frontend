import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

import api from "../../../api/axios";

export default function RoomCard({ roomType, checkIn, checkOut }) {

  const [loading, setLoading] = useState(false);

  const bookRoom = async () => {

    // Validate dates
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates first.");
      return;
    }

    setLoading(true);

    try {

      // 1️⃣ Check upgrade suggestion
      const upgrade = await api.post(
        "/api/guest/rooms/upgrade-suggestion",
        {
          roomTypeId: roomType.roomTypeId,
          checkIn,
          checkOut
        }
      );

      let finalRoomType = roomType.roomTypeId;
      let upgradeAccepted = false;

      // 2️⃣ If upgrade available show popup
      if (upgrade.data.available) {

        const confirmUpgrade = window.confirm(
          `Upgrade available!\n\nUpgrade to ${upgrade.data.roomTypeName}\nExtra price: ₹${upgrade.data.priceDifference} per night\n\nDo you want to upgrade?`
        );

        if (confirmUpgrade) {
          finalRoomType = upgrade.data.roomTypeId;
          upgradeAccepted = true;
        }

      }

      // 3️⃣ Create booking
      await api.post("/api/guest/rooms/book", {
        roomTypeId: finalRoomType,
        checkIn,
        checkOut,
        upgradeAccepted
      });

      alert("Room booked successfully!");

    } catch (err) {

      console.error("Booking failed", err);
      alert("Booking failed. Please try again.");

    } finally {
      setLoading(false);
    }

  };

  return (

    <Card>

      <CardContent>

        <Typography variant="h6">
          {roomType.name}
        </Typography>

        <Typography>
          {roomType.description}
        </Typography>

        <Typography>
          Capacity: {roomType.capacity} Guests
        </Typography>

        <Typography>
          Bed: {roomType.bedType}
        </Typography>

        <Typography>
          Size: {roomType.roomSize} m²
        </Typography>

        <Typography>
          Amenities: {roomType.amenities}
        </Typography>

        <Typography>
          Price: ₹{roomType.price} / night
        </Typography>

        <Typography>
          Available: {roomType.availableRooms}
        </Typography>

        <Stack mt={2}>

          <Button
            variant="contained"
            onClick={bookRoom}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Room"}
          </Button>

        </Stack>

      </CardContent>

    </Card>

  );
}