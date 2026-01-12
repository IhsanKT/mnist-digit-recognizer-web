import { useState } from "react";
import axios from "axios";
import DrawingCanvas from "./components/DrawingCanvas";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictDigit = async (image) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        { image }
      );
      setResult(response.data);
    } catch (error) {
      alert("Backend not reachable");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>MNIST Digit Recognizer</h1>

      <DrawingCanvas onPredict={predictDigit} />

      {loading && <p>Predicting...</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Prediction: {result.digit}</h2>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
}

export default App;
