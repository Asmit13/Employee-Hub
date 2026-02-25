import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const { state } = useLocation();
  const data = state || [];

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: "90vh" }}>
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item, index) => (
        <Marker key={index} position={[item.latitude, item.longitude]}>
          <Popup>
            {item.name} - {item.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}