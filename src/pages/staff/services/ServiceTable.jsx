import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip
} from "@mui/material";

import api from "../../../api/axios";

export default function ServiceTable({
  services = [],
  showAssign = false,
  refresh
}) {

  const handleAssign = async (id) => {

    try {

      await api.put(`/api/staff/services/${id}/assign`);

      if (refresh) refresh();

    } catch (err) {

      console.error("Failed to assign service", err);

    }

  };

  return (

    <Table>

      <TableHead>

        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Service</TableCell>
          <TableCell>Guest</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
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
                  s.status === "PENDING"
                    ? "warning"
                    : s.status === "ASSIGNED"
                    ? "primary"
                    : "success"
                }
                size="small"
              />
            </TableCell>

            <TableCell>

              {showAssign && s.status === "PENDING" && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAssign(s.id)}
                >
                  Assign
                </Button>
              )}

            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>

  );

}