import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Box, Typography, Button, Stack, CircularProgress, Alert } from "@mui/material";
import ServiceRequestTable from "./ServiceRequestTable";
import CreateServiceRequest from "./CreateServiceRequest";

export default function MyServiceRequests() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/guest/services");
      setServices(res.data || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load service requests");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Service Requests</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Request Service
        </Button>
      </Stack>

      <CreateServiceRequest
        open={open}
        onClose={() => setOpen(false)}
        onSaved={fetchServices}
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box textAlign="center" mt={5}><CircularProgress /></Box>
      ) : (
        <ServiceRequestTable services={services} />
      )}
    </Box>
  );
}
