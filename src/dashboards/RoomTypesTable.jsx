import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Typography, Paper, Stack
} from "@mui/material";
import AddRoomTypeDialog from "./AddRoomTypeDialog";

const RoomTypesTable = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  const fetchRoomTypes = async () => {
    const url = showInactive
      ? "/api/admin/room-types/all"
      : "/api/admin/room-types";
    const res = await api.get(url);
    setRoomTypes(res.data);
  };

  const deactivateType = async (id) => {
    await api.delete(`/api/admin/room-types/${id}`);
    fetchRoomTypes();
  };

  const activateType = async (id) => {
    await api.put(`/api/admin/room-types/${id}/activate`);
    fetchRoomTypes();
  };

  useEffect(() => {
    fetchRoomTypes();
  }, [showInactive]);

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Room Types</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => setShowInactive(prev => !prev)}>
            {showInactive ? "Show Active Only" : "Show All"}
          </Button>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Room Type
          </Button>
        </Stack>
      </Stack>

      <AddRoomTypeDialog
        open={open}
        onClose={() => setOpen(false)}
        onSaved={fetchRoomTypes}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Base Price</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {roomTypes.map(type => (
            <TableRow key={type.id}>
              <TableCell>{type.id}</TableCell>
              <TableCell>{type.name}</TableCell>
              <TableCell>{type.description}</TableCell>
              <TableCell>{type.basePrice}</TableCell>
              <TableCell>{type.capacity}</TableCell>
              <TableCell>{type.active ? "Yes" : "No"}</TableCell>
              <TableCell>
                {type.active ? (
                  <Button color="error" onClick={() => deactivateType(type.id)}>
                    Deactivate
                  </Button>
                ) : (
                  <Button color="success" onClick={() => activateType(type.id)}>
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

export default RoomTypesTable;
