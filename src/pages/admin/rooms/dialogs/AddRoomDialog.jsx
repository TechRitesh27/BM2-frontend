import { useEffect, useState } from "react";
import api from "../../../../api/axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  DialogActions
} from "@mui/material";

const AddRoomDialog = ({ open, onClose, onSaved }) => {

  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [roomTypeId, setRoomTypeId] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    if (open) {
      api.get("/api/admin/room-types")
        .then(res => setRoomTypes(res.data));
    }
  }, [open]);

  const handleSave = async () => {

    await api.post("/api/admin/rooms", {
      roomNumber,
      floor,
      roomTypeId
    });

    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>

      <DialogTitle>Add Room</DialogTitle>

      <DialogContent>

        <TextField
          label="Room Number"
          fullWidth
          margin="normal"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />

        <TextField
          label="Floor"
          type="number"
          fullWidth
          margin="normal"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
        />

        <TextField
          select
          label="Room Type"
          fullWidth
          margin="normal"
          value={roomTypeId}
          onChange={(e) => setRoomTypeId(e.target.value)}
        >
          {roomTypes.map(type => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default AddRoomDialog;