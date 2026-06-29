import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, TextField, Button,
  Divider, Alert, Stack, CircularProgress, Grid, Chip
} from "@mui/material";
import api from "../../../api/axios";

export default function StaffProfile() {
  const [profile, setProfile]   = useState(null);
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError]     = useState("");
  const [saving, setSaving]     = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passLoading, setPassLoading]         = useState(false);
  const [passSuccess, setPassSuccess]         = useState("");
  const [passError, setPassError]             = useState("");

  useEffect(() => {
    api.get("/api/auth/profile")
      .then(res => {
        setProfile(res.data);
        setName(res.data.name || "");
        setPhone(res.data.phone || "");
      })
      .catch(() => setProfileError("Failed to load profile"))
      .finally(() => setProfileLoading(false));
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileSuccess(""); setProfileError("");
    setSaving(true);
    try {
      const res = await api.put("/api/auth/profile", { name, phone });
      setProfile(res.data);
      setProfileSuccess("Profile updated successfully!");
    } catch (err) {
      setProfileError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassSuccess(""); setPassError("");
    if (newPassword !== confirmPassword) { setPassError("Passwords do not match"); return; }
    if (newPassword.length < 6)         { setPassError("Minimum 6 characters"); return; }
    setPassLoading(true);
    try {
      await api.post("/api/auth/change-password", { currentPassword, newPassword });
      setPassSuccess("Password changed successfully!");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch (err) {
      setPassError(err.response?.data?.message || "Failed to change password");
    } finally {
      setPassLoading(false);
    }
  };

  if (profileLoading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box maxWidth={600}>
      <Typography variant="h4" mb={3}>My Profile</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Staff Information</Typography>
          {profile?.staffType && (
            <Chip label={profile.staffType.name} color="primary" size="small" />
          )}
        </Stack>
        <Divider sx={{ mb: 2 }} />

        {profileSuccess && <Alert severity="success" sx={{ mb: 2 }}>{profileSuccess}</Alert>}
        {profileError   && <Alert severity="error"   sx={{ mb: 2 }}>{profileError}</Alert>}

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" value={profile?.email || ""} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Department" value={profile?.staffType?.name || "N/A"} disabled />
          </Grid>
        </Grid>

        <form onSubmit={handleProfileSave}>
          <Stack spacing={2}>
            <TextField
              fullWidth label="Full Name" required
              value={name} onChange={e => setName(e.target.value)}
            />
            <TextField
              fullWidth label="Phone Number"
              value={phone} onChange={e => setPhone(e.target.value)}
            />
            <Button type="submit" variant="contained" disabled={saving} sx={{ alignSelf: "flex-start" }}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={1}>Change Password</Typography>
        <Divider sx={{ mb: 2 }} />

        {passSuccess && <Alert severity="success" sx={{ mb: 2 }}>{passSuccess}</Alert>}
        {passError   && <Alert severity="error"   sx={{ mb: 2 }}>{passError}</Alert>}

        <form onSubmit={handleChangePassword}>
          <Stack spacing={2}>
            <TextField
              fullWidth label="Current Password" type="password" required
              value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
            />
            <TextField
              fullWidth label="New Password" type="password" required
              value={newPassword} onChange={e => setNewPassword(e.target.value)}
              helperText="Minimum 6 characters"
            />
            <TextField
              fullWidth label="Confirm New Password" type="password" required
              value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="warning" disabled={passLoading} sx={{ alignSelf: "flex-start" }}>
              {passLoading ? "Changing..." : "Change Password"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
