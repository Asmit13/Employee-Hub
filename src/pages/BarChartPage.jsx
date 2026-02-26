import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useLocation } from "react-router-dom";

export default function BarChartPage() {
  const { state } = useLocation();

  // Convert array data → chart friendly object format
  const chartData =
    state?.slice(0, 10).map((item) => ({
      name: item[0],
      salary: parseInt(item[5].replace(/[$,]/g, "")), // "$320,800" → 320800
    })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">
          Salary Analytics (Top 10 Employees)
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={80}
            />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="salary" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}