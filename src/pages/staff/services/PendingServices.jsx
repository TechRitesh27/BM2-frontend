import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  Box,
  Typography,
  CircularProgress
} from "@mui/material";

import ServiceTable from "./ServiceTable";

export default function PendingServices() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {

    try {

      const res = await api.get("/api/staff/services/pending");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.content || [];

      setServices(data);

    } catch (err) {

      console.error("Failed to load services", err);
      setServices([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>

      <Typography variant="h5" mb={3}>
        Pending Service Requests
      </Typography>

      <ServiceTable
        services={services}
        showAssign
        refresh={fetchServices}
      />

    </Box>
  );

}