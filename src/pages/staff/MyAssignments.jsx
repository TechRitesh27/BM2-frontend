import { useEffect, useState } from "react";
import axios from "axios";
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
  Stack,
} from "@mui/material";

export default function MyAssignments() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchAssignments = () => {
    axios
      .get("/api/staff/services/my-assignments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // 🔥 SAFE HANDLING
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.content || res.data.data || [];

        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setServices([]); // prevent crash
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleComplete = (id) => {
    axios
      .put(
        `/api/staff/services/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchAssignments();
      });
  };

  const handleReject = (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    axios
      .put(
        `/api/staff/services/${id}/reject?reason=${reason}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchAssignments();
      });
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
          {Array.isArray(services) &&
            services.map((s) => (
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