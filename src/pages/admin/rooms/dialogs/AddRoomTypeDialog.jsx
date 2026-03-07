import { useState } from "react";
import api from "../../../../api/axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions
} from "@mui/material";

const AddRoomTypeDialog = ({ open, onClose, onSaved }) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSave = async () => {

    await api.post("/api/admin/room-types", {
      name,
      description,
      basePrice,
      capacity
    });

    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>

      <DialogTitle>Add Room Type</DialogTitle>

      <DialogContent>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <TextField
          label="Base Price"
          type="number"
          fullWidth
          margin="normal"
          value={basePrice}
          onChange={e => setBasePrice(e.target.value)}
        />

        <TextField
          label="Capacity"
          type="number"
          fullWidth
          margin="normal"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
        />

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

export default AddRoomTypeDialog;