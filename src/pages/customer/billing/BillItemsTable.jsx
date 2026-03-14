import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

export default function BillItemsTable({ items }) {

  const rows = items || [];

  return (
    <Paper sx={{ p: 2 }}>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {rows.map((item) => (

            <TableRow key={item.id}>

              <TableCell>{item.id}</TableCell>

              <TableCell>
                {item.description}
              </TableCell>

              <TableCell>
                ₹{item.amount}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>
  );
}