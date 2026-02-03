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

      {tab === 0 && <RoomsTable />}
      {tab === 1 && <RoomTypesTable />}
    </Box>
  );
};

export default AdminRooms;
