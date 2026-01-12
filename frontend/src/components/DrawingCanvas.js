import { useRef, useState } from "react";

function DrawingCanvas({ onPredict }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const startDrawing = (e) => {
    setDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setDrawing(false);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 280, 280);
  };

  const handlePredict = () => {
    const image = canvasRef.current.toDataURL("image/png");
    onPredict(image);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        style={{ background: "black", border: "2px solid white" }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
      />
      <br />
      <button onClick={handlePredict}>Predict</button>
      <button onClick={clearCanvas} style={{ marginLeft: "10px" }}>
        Clear
      </button>
    </div>
  );
}

export default DrawingCanvas;
