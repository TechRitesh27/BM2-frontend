import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
  Stack
} from "@mui/material";

import AddRoomDialog from "./dialogs/AddRoomDialog";

const RoomsTable = () => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  const fetchRooms = async () => {
    const url = showInactive
      ? "/api/admin/rooms/all"
      : "/api/admin/rooms";

    const res = await api.get(url);
    setRooms(res.data);
  };

  const deactivateRoom = async (id) => {
    await api.delete(`/api/admin/rooms/${id}`);
    fetchRooms();
  };

  const activateRoom = async (id) => {
    await api.put(`/api/admin/rooms/${id}/activate`);
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, [showInactive]);

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Rooms</Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => setShowInactive((prev) => !prev)}
          >
            {showInactive ? "Show Active Only" : "Show All"}
          </Button>

          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Room
          </Button>
        </Stack>
      </Stack>

      <AddRoomDialog
        open={open}
        onClose={() => setOpen(false)}
        onSaved={fetchRooms}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Room No</TableCell>
            <TableCell>Floor</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.id}</TableCell>
              <TableCell>{room.roomNumber}</TableCell>
              <TableCell>{room.floor}</TableCell>
              <TableCell>{room.roomType?.name}</TableCell>
              <TableCell>{room.status}</TableCell>
              <TableCell>{room.active ? "Yes" : "No"}</TableCell>

              <TableCell>
                {room.active ? (
                  <Button
                    color="error"
                    onClick={() => deactivateRoom(room.id)}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onClick={() => activateRoom(room.id)}
                  >
                    Activate
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RoomsTable;