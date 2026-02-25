import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useLocation } from "react-router-dom";

export default function BarChartPage() {
  const { state } = useLocation();
  const data = state?.slice(0, 10);

  return (
    <div className="h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Salary Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="salary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}