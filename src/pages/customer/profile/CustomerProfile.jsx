import { useState } from "react";
import {
  Box, Typography, Paper, TextField, Button,
  Divider, Alert, Stack
} from "@mui/material";
import api from "../../../api/axios";

export default function CustomerProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/change-password", {
        currentPassword,
        newPassword
      });
      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={500}>
      <Typography variant="h4" mb={3}>My Profile</Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Change Password</Typography>
        <Divider sx={{ mb: 3 }} />

        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error   && <Alert severity="error"   sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleChangePassword}>
          <Stack spacing={2}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
