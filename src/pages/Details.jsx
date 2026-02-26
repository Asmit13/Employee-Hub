import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRef } from "react";

export default function Details() {
  const { state } = useLocation();
   // console.log("Received state:", state);
  const webcamRef = useRef(null);
  console.log("Location:", window.location.pathname.split("/").pop());
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    navigate("/photo", { state: imageSrc });
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 p-6 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">

      {/* Header Section */}
      <div className="bg-indigo-600 p-6 flex items-center gap-6">
        <img
          src={`https://i.pravatar.cc/150?img=${ window.location.pathname.split("/").pop() + 10
          }`}
          alt="employee"
          className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
        />

        <div className="text-white">
          <h2 className="text-2xl font-bold">{state[0]}</h2>
          <p className="text-indigo-100 font-medium">{state[1]}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">

        <div className="space-y-3">
          <p><span className="font-semibold">City:</span> {state[2]}</p>
          <p><span className="font-semibold">Postal Code:</span> {state[3]}</p>
          <p><span className="font-semibold"> Joining Date:</span> {state[4]}</p>
        </div>

        <div className="flex flex-col justify-between">
          <div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-4 py-2 rounded-xl text-center font-semibold text-lg shadow">
             {state[5]}
          </div>
        </div>

      </div>

      {/* Webcam Section */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Capture Employee Photo
        </h3>

        <div className="rounded-xl overflow-hidden shadow-md">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full"
          />
        </div>

        <button
          onClick={capture}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition duration-300 shadow-md"
        >
          Capture Photo
        </button>
      </div>

    </div>
  </div>
);
}