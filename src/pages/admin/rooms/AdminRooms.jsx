import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

import RoomsTable from "./RoomsTable";
import RoomTypesTable from "./RoomTypesTable";

const AdminRooms = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(e, val) => setTab(val)}>
        <Tab label="Rooms" />
        <Tab label="Room Types" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && <RoomsTable />}
        {tab === 1 && <RoomTypesTable />}
      </Box>
    </Box>
  );
};

export default AdminRooms;