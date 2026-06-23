import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { Typography } from "@mui/material";

const formatCurrency = (value) => `₹${value.toLocaleString()}`;

const RevenueChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography color="text.secondary">No revenue data available yet.</Typography>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* backend sends { month: "JANUARY 2026", revenue: 12000 } */}
        <XAxis
          dataKey="month"
          angle={-40}
          textAnchor="end"
          tick={{ fontSize: 11 }}
        />
        <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 11 }} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Bar dataKey="revenue" fill="#4caf50" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
