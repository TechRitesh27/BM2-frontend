import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import ServiceTable from "./ServiceTable";

export default function PendingServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/staff/services/pending");
      setServices(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load services");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h5" mb={3}>Pending Service Requests</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <ServiceTable services={services} showAssign refresh={fetchServices} />
    </Box>
  );
}
