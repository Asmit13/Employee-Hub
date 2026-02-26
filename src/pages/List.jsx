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
        toast.success("Data Loaded ");
      })
      .catch((err) => {
        console.error(err);
        toast.error("API Error ❌");
      })
      .finally(() => setLoading(false));
  }, []);

  // Safe filter (avoid crash if name missing)
  const filtered = data.filter((item) =>
    (item[0] || item?.employee_name || "")
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
          className="text-white border-gray-300 p-2 border rounded-full focus:outline-none focus:ring-2 w-64 px-2 focus:ring-indigo-500 bg-gray-200 dark:bg-gray-800"
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
            const name = item[0] || item?.employee_name || "Unknown";
            const city = item[2] || item?.employee_city || "N/A";

           return (
  <motion.div
    whileHover={{ y: -6 }}
    whileTap={{ scale: 0.98 }}
    key={index}
    onClick={() => navigate(`/details/${index}`, { state: item })}
    className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700"
  >
    {/* Top Section */}
    <div className="flex items-center gap-4 p-4">
      
      {/* Mock Profile Image */}
      <img
        src={`https://i.pravatar.cc/150?img=${index + 10}`}
        alt="employee"
        className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
      />

      {/* Name + Role */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {item[0]}
        </h3>
        <p className="text-sm text-indigo-500 font-medium">
          {item[1]}
        </p>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="px-4 pb-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">

      <div className="flex justify-between">
        <span> {item[2]}</span>
        <span> {item[3]}</span>
      </div>

      <div className="flex justify-between">
        <span>📅 Joined: {item[4]}</span>
        <span className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-semibold">
          {item[5]}
        </span>
      </div>

    </div>
  </motion.div>
);
          })}
        </div>
      )}
    </div>
  );
}