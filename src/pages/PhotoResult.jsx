import { useLocation } from "react-router-dom";

export default function PhotoResult() {
  const { state } = useLocation();

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">Captured Photo</h2>
      <img src={state} alt="Captured" className="rounded shadow-lg" />
    </div>
  );
}