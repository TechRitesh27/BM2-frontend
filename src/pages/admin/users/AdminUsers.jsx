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

      <Box sx={{ mt: 2 }}>
        {tab === 0 && <StaffTable />}
        {tab === 1 && <CustomersTable />}
      </Box>
    </Box>
  );
};

export default AdminUsers;