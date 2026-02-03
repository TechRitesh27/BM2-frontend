import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import StaffTable from "./StaffTable";
import CustomersTable from "./CustomersTable";

const AdminUsers = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(e, val) => setTab(val)}>
        <Tab label="Staff" />
        <Tab label="Customers" />
      </Tabs>

      {tab === 0 && <StaffTable />}
      {tab === 1 && <CustomersTable />}
    </Box>
  );
};

export default AdminUsers;
