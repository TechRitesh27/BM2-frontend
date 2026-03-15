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
  const [bedType, setBedType] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [amenities, setAmenities] = useState("");
  const [priority, setPriority] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = async () => {

    await api.post("/api/admin/room-types", {
      name,
      description,
      basePrice,
      capacity,
      bedType,
      roomSize,
      amenities,
      priority,
      imageUrl
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

        <TextField
          label="Bed Type"
          fullWidth
          margin="normal"
          value={bedType}
          onChange={e => setBedType(e.target.value)}
        />

        <TextField
          label="Room Size (m²)"
          type="number"
          fullWidth
          margin="normal"
          value={roomSize}
          onChange={e => setRoomSize(e.target.value)}
        />

        <TextField
          label="Amenities (comma separated)"
          fullWidth
          margin="normal"
          value={amenities}
          onChange={e => setAmenities(e.target.value)}
        />

        <TextField
          label="Priority"
          type="number"
          fullWidth
          margin="normal"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        />

        <TextField
          label="Image URL"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
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