import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="revenue" fill="#4caf50" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;