import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function StaffRedirect() {

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {

    if (!user) return;

    const staffType = user.staffType;

    if (staffType === "FRONT_DESK") {
      navigate("/staff/frontdesk/dashboard", { replace: true });
    }
    else if (staffType === "HOUSEKEEPING") {
      navigate("/staff/housekeeping/dashboard", { replace: true });
    }
    else {
      navigate("/staff/dashboard", { replace: true });
    }

  }, [user, navigate]);

  return null;
}