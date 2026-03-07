import { useEffect, useState } from "react";
import axios from "axios";
import StaffStatsCards from "./components/StaffStatsCards";

export default function StaffDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/api/staff/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setData(res.data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return <StaffStatsCards data={data} />;
}