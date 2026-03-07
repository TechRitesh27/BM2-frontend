import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  CircularProgress,
  Stack
} from "@mui/material";

export default function MyAssignments() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {

    try {

      const res = await api.get("/api/staff/services/my-assignments");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.content || [];

      setServices(data);

    } catch (err) {

      console.error("Failed to fetch assignments", err);
      setServices([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleComplete = async (id) => {

    await api.put(`/api/staff/services/${id}/complete`);

    fetchAssignments();

  };

  const handleReject = async (id) => {

    const reason = prompt("Enter rejection reason:");

    if (!reason) return;

    await api.put(`/api/staff/services/${id}/reject?reason=${reason}`);

    fetchAssignments();

  };

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
        My Assigned Services
      </Typography>

      <Table>

        <TableHead>

          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Guest</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Requested At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>

        </TableHead>

        <TableBody>

          {services.map((s) => (

            <TableRow key={s.id}>

              <TableCell>{s.id}</TableCell>

              <TableCell>{s.serviceType?.name}</TableCell>

              <TableCell>{s.user?.name}</TableCell>

              <TableCell>{s.status}</TableCell>

              <TableCell>
                {s.requestedAt
                  ? new Date(s.requestedAt).toLocaleString()
                  : "-"}
              </TableCell>

              <TableCell>

                {s.status === "ASSIGNED" && (

                  <Stack direction="row" spacing={1}>

                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleComplete(s.id)}
                    >
                      Complete
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleReject(s.id)}
                    >
                      Reject
                    </Button>

                  </Stack>

                )}

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Box>

  );

}