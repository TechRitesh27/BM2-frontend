import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  Chip
} from "@mui/material";

export default function ServiceHistory() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {

    try {

      const res = await api.get("/api/staff/services/history");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.content || [];

      setServices(data);

    } catch (err) {

      console.error("Failed to fetch history", err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchHistory();
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
        Service History
      </Typography>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Guest</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Completed At</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {services.map((s) => (

            <TableRow key={s.id}>

              <TableCell>{s.id}</TableCell>

              <TableCell>{s.serviceType?.name}</TableCell>

              <TableCell>{s.user?.name}</TableCell>

              <TableCell>
                <Chip
                  label={s.status}
                  color={
                    s.status === "COMPLETED"
                      ? "success"
                      : "error"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell>
                {s.completedAt
                  ? new Date(s.completedAt).toLocaleString()
                  : "-"}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Box>

  );
}