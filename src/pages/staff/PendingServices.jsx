import { useEffect, useState } from "react";
import axios from "axios";
import ServiceTable from "../../components/ServiceTable";

export default function PendingServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/staff/services/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
  const data = Array.isArray(res.data)
    ? res.data
    : res.data.content || [];

  setServices(data);
});
  }, []);

  return <ServiceTable services={services} showAssign />;
}