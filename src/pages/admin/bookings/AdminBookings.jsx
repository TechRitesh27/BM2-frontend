import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Select,
  MenuItem,
  Button
} from "@mui/material";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await api.get("/api/admin/bookings");
    setBookings(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/api/admin/bookings/${id}/status?status=${status}`);
    fetchBookings();
  };

  const cancelBooking = async (id) => {
    await api.put(`/api/admin/bookings/${id}/cancel`);
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Bookings Management
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Check-In</TableCell>
            <TableCell>Check-Out</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Cancel</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.user?.email}</TableCell>
              <TableCell>{b.room?.roomNumber}</TableCell>
              <TableCell>{b.checkIn}</TableCell>
              <TableCell>{b.checkOut}</TableCell>
              <TableCell>{b.totalAmount}</TableCell>
              <TableCell>{b.status}</TableCell>

              <TableCell>
                <Select
                  size="small"
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                >
                  <MenuItem value="BOOKED">BOOKED</MenuItem>
                  <MenuItem value="CHECKED_IN">CHECKED_IN</MenuItem>
                  <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                  <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                </Select>
              </TableCell>

              <TableCell>
                <Button color="error" onClick={() => cancelBooking(b.id)}>
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AdminBookings;