import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function List() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("https://backend.jotish.in/backend_dev/gettabledata.php", {
        username: "test",
        password: "123456",
      })
      .then((res) => {
        console.log("API Response:", res.data);

        // ✅ Correct nested path
        const employees = Array.isArray(res.data?.TABLE_DATA?.data)
          ? res.data.TABLE_DATA.data
          : [];

        setData(employees);
        toast.success("Data Loaded 🚀");
      })
      .catch((err) => {
        console.error(err);
        toast.error("API Error ❌");
      })
      .finally(() => setLoading(false));
  }, []);

  // Safe filter (avoid crash if name missing)
  const filtered = data.filter((item) =>
    (item?.name || item?.employee_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition">
      {/* Search + Chart/Map Buttons */}
      <div className="flex justify-between mb-4">
        <input
          className="p-2 border rounded w-64"
          placeholder="Search employee..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <button
            onClick={() => navigate("/chart", { state: data })}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Chart
          </button>
          <button
            onClick={() => navigate("/map", { state: data })}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Map
          </button>
        </div>
      </div>

      {/* Employee Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No Employees Found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {filtered.map((item, index) => {
            // Safe data extraction
            const name = item?.name || item?.employee_name || "Unknown";
            const city = item?.city || item?.employee_city || "N/A";

            return (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={index}
                onClick={() => navigate(`/details/${index}`, { state: item })}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow cursor-pointer transition"
              >
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-sm text-gray-500">{city}</p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}