import { useState } from "react";
import axios from "axios";
import DrawingCanvas from "./components/DrawingCanvas";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const clearResult = () => {
    setResult(null);
    setError("");
  };

  const predictDigit = async (image) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(`${API_URL}/predict`, { image });
      setResult(res.data);
    } catch (err) {
      setError("Backend is waking up or unreachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-3 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-slate-800 rounded-2xl shadow-xl
                  p-4 sm:p-6 space-y-5 sm:space-y-6">


        <header className="text-center space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-sky-400">
            MNIST Digit Recognizer
          </h1>
          <p className="text-sm text-gray-400">
            Draw a digit (0–9). The model predicts what it sees.
          </p>
        </header>

        <DrawingCanvas onPredict={predictDigit} disabled={loading} onClear={clearResult} />

        <div className="text-center min-h-[80px]">
          {loading && (
            <p className="text-yellow-400 animate-pulse">
              Predicting…
            </p>
          )}

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {result && (
            <div className="space-y-2">
              <p className="text-base sm:text-lg">
                Prediction:{" "}
                <span className="text-green-400 font-semibold">
                  {result.digit}
                </span>
              </p>

              <ConfidenceBar value={result.confidence} />
            </div>
          )}
        </div>

        <footer className="text-center text-xs text-gray-500 space-y-1 pt-2">
          <p>CNN trained on MNIST • FastAPI + React</p>
          <p className="text-gray-600">
            © {new Date().getFullYear()} Ihsan Afroz KT. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}

function ConfidenceBar({ value }) {
  const percent = Math.round(value * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Confidence</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className="bg-green-400 h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
