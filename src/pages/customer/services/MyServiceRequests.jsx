import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  Box,
  Typography,
  Button,
  Stack
} from "@mui/material";

import ServiceRequestTable from "./ServiceRequestTable";
import CreateServiceRequest from "./CreateServiceRequest";

export default function MyServiceRequests() {

  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchServices = async () => {

    try {

      const res = await api.get("/api/guest/services");

      setServices(res.data || []);

    } catch (err) {

      console.error(err);
      setServices([]);
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
        mb={3}
      >

        <Typography variant="h4">
          My Service Requests
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Request Service
        </Button>

      </Stack>

      <CreateServiceRequest
        open={open}
        onClose={() => setOpen(false)}
        onSaved={fetchServices}
      />

      <ServiceRequestTable services={services} />

    </Box>
  );
}