import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRef } from "react";

export default function Details() {
  const { state } = useLocation();
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    navigate("/photo", { state: imageSrc });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">{state.name}</h2>
      <p>City: {state.city}</p>
      <p>Salary: {state.salary}</p>

      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="mt-4" />
      <button
        onClick={capture}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Capture Photo
      </button>
    </div>
  );
}