import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const cityCache = {};

export default function MapPage() {
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

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
  // Geocode function (City → Coordinates)
  const getCoordinates = async (city) => {
    if (cityCache[city]) return cityCache[city];
    console.log(`Geocoding city: ${city}`);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          city
        )}&format=json&limit=1`
      );
      const result = await response.json();
       console.log(`Geocoding "${city}":`, response);
      if (result.length > 0) {
        const coords = [
          parseFloat(result[0].lat),
          parseFloat(result[0].lon),
        ];
        cityCache[city] = coords;
        return coords;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }

    return null;
  };

  // Fetch coordinates for all employees
  useEffect(() => {
    const fetchLocations = async () => {
      const results = await Promise.all(
        data.map(async (item) => {
          const coords = await getCoordinates(item[2]); // item[2] = city
          if (!coords) return null;
          return { coords, item };
        })
      );

      setLocations(results.filter(Boolean));
      setLoading(false);
    };

    if (data?.length) fetchLocations();
  }, [data]);

  const cityCoordinates = {
    Edinburgh: [55.9533, -3.1883],
    Tokyo: [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    "New York": [40.7128, -74.006],
    London: [51.5072, -0.1276],
    Sidney: [-33.8688, 151.2093],
    Singapore: [1.3521, 103.8198],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 p-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-indigo-600 text-white text-xl font-semibold">
          Employee Location Map
        </div>

        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data?.map((item, index) => {
            const coords = cityCoordinates[item[2]];
            if (!coords) return null;

            return (
              <Marker key={index} position={coords}>
                <Popup>
                  <div className="text-sm">
                    <h3 className="font-bold text-indigo-600">
                      {item[0]}
                    </h3>
                    <p>{item[1]}</p>
                    <p>📍 {item[2]}</p>
                    <p>📅 {item[4]}</p>
                    <p className="font-semibold text-green-600">
                      💰 {item[5]}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}