import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";

export default function RoomCard({ room, refresh }) {
  const token = localStorage.getItem("token");

  const startCleaning = () => {
    axios.put(
      `/api/staff/housekeeping/${room.id}/start-cleaning`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(refresh);
  };

  const markClean = () => {
    axios.put(
      `/api/staff/housekeeping/${room.id}/mark-clean`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(refresh);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Room {room.roomNumber}</Typography>
        <Typography>Status: {room.status}</Typography>

        {room.status === "DIRTY" && (
          <Button onClick={startCleaning}>Start Cleaning</Button>
        )}

        {room.status === "CLEANING" && (
          <Button onClick={markClean}>Mark Clean</Button>
        )}
      </CardContent>
    </Card>
  );
}