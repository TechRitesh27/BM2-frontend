import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack
} from "@mui/material";

import { QRCodeCanvas } from "qrcode.react";

export default function BookingTable({ bookings }) {

  const downloadQR = (id) => {
    const canvas = document.getElementById(`qr-${id}`);
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = `booking-${id}.png`;
    link.click();
  };

  return (
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
            <TableCell>QR</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {bookings.map((b) => {

            const qrValue = `BOOKING:${b.qrToken}`;

            return (
              <TableRow key={b.id}>

                <TableCell>{b.id}</TableCell>

                <TableCell>
                  {b.room?.roomNumber} ({b.room?.roomType?.name})
                </TableCell>

                <TableCell>{b.checkIn}</TableCell>
                <TableCell>{b.checkOut}</TableCell>
                <TableCell>{b.status}</TableCell>
                <TableCell>₹{b.totalAmount}</TableCell>

                <TableCell>

                  {b.qrToken && b.status === "BOOKED" ? (

                    <Stack alignItems="center" spacing={1}>

                      <QRCodeCanvas
                        id={`qr-${b.id}`}
                        value={qrValue}
                        size={100}
                      />

                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => downloadQR(b.id)}
                      >
                        Download
                      </Button>

                    </Stack>

                  ) : "N/A"}

                </TableCell>

              </TableRow>
            );
          })}

        </TableBody>

      </Table>
    </Paper>
  );
}