import { useEffect, useState } from "react";
import api from "../../../../api/axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  MenuItem,
  Alert
} from "@mui/material";

const CreateStaffDialog = ({ open, onClose, onSaved }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [staffType, setStaffType] = useState("");
  const [staffTypes, setStaffTypes] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (open) {

      api.get("/api/admin/staff-types")
        .then(res => setStaffTypes(res.data))
        .catch(() => setError("Failed to load staff types"));

    }

  }, [open]);

  useEffect(() => {

    if (!open) {
      setName("");
      setEmail("");
      setPhone("");
      setStaffType("");
      setError("");
      setLoading(false);
    }

  }, [open]);

  const handleSave = async () => {

    setError("");
    setLoading(true);

    try {

      await api.post("/api/admin/staff", {
        name,
        email,
        phone,
        staffType
      });

      onSaved();
      onClose();

    } catch (err) {

      if (err.response?.status === 403) {
        setError("You are not authorized to create staff");
      }
      else if (err.response?.data?.message) {
        setError(err.response.data.message);
      }
      else {
        setError("Failed to create staff");
      }

    } finally {
      setLoading(false);
    }

  };

  const isFormValid =
    name.trim() &&
    email.trim() &&
    phone.trim() &&
    staffType.trim();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>

      <DialogTitle>Create Staff</DialogTitle>

      <DialogContent>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <TextField
          select
          label="Staff Type"
          fullWidth
          margin="normal"
          value={staffType}
          onChange={e => setStaffType(e.target.value)}
        >
          {staffTypes.map(type => (
            <MenuItem key={type.id} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isFormValid || loading}
        >
          {loading ? "Creating..." : "Create"}
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default CreateStaffDialog;