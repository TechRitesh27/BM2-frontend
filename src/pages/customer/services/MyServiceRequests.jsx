import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Box, Typography, Button, Stack, Alert } from "@mui/material";

import ServiceRequestTable from "./ServiceRequestTable";
import CreateServiceRequest from "./CreateServiceRequest";

export default function MyServiceRequests() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      const res = await api.get("/api/guest/services");
      const fetchServices = async () => {
        try {
          const res = await api.get("/api/guest/services");
          setServices(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
          setError("Failed to load service requests");
          setServices([]);
        }
      };
    } catch (err) {
      setError("Failed to load service requests");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">My Service Requests</Typography>

        <Button variant="contained" onClick={() => setOpen(true)}>
          Request Service
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <CreateServiceRequest
        open={open}
        onClose={() => setOpen(false)}
        onSaved={fetchServices}
      />

      <ServiceRequestTable services={services} />
    </Box>
  );
}
