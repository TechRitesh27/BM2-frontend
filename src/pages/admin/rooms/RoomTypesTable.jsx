import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Typography, Paper, Stack, Chip, Alert
} from "@mui/material";
import AddRoomTypeDialog from "./dialogs/AddRoomTypeDialog";

const RoomTypesTable = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [error, setError] = useState("");

  const fetchRoomTypes = async () => {
    try {
      const url = showInactive ? "/api/admin/room-types/all" : "/api/admin/room-types";
      const res = await api.get(url);
      setRoomTypes(res.data || []);
    } catch {
      setError("Failed to load room types");
    }
  };

  const deactivateType = async (id) => {
    try {
      await api.delete(`/api/admin/room-types/${id}`);
      fetchRoomTypes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to deactivate");
    }
  };

  const activateType = async (id) => {
    try {
      await api.put(`/api/admin/room-types/${id}/activate`);
      fetchRoomTypes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to activate");
    }
  };

  useEffect(() => { fetchRoomTypes(); }, [showInactive]);

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Room Types</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => setShowInactive(p => !p)}>
            {showInactive ? "Show Active Only" : "Show All"}
          </Button>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Room Type
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      <AddRoomTypeDialog open={open} onClose={() => setOpen(false)} onSaved={fetchRoomTypes} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Base Price</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Bed Type</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomTypes.length === 0 && (
            <TableRow><TableCell colSpan={10} align="center">No room types found</TableCell></TableRow>
          )}
          {roomTypes.map((type) => (
            <TableRow key={type.id}>
              <TableCell>{type.id}</TableCell>
              <TableCell>{type.name}</TableCell>
              <TableCell>{type.description || "—"}</TableCell>
              <TableCell>₹{type.basePrice?.toLocaleString()}</TableCell>
              <TableCell>{type.capacity}</TableCell>
              <TableCell>{type.bedType || "—"}</TableCell>
              <TableCell>{type.roomSize ? `${type.roomSize} m²` : "—"}</TableCell>
              <TableCell>{type.priority ?? "—"}</TableCell>
              <TableCell>
                <Chip
                  label={type.active ? "Active" : "Inactive"}
                  color={type.active ? "success" : "default"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {type.active ? (
                  <Button size="small" color="error" onClick={() => deactivateType(type.id)}>
                    Deactivate
                  </Button>
                ) : (
                  <Button size="small" color="success" onClick={() => activateType(type.id)}>
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
