import { useRef, useState } from "react";

export default function DrawingCanvas({ onPredict, disabled, onClear }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top,
    };
  };

  const start = (e) => {
    setDrawing(true);
    draw(e);
  };

  const stop = () => {
    setDrawing(false);
    canvasRef.current.getContext("2d").beginPath();
  };

  const draw = (e) => {
    if (!drawing) return;

    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);

    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 280, 280);
    onClear();
  };

  const predict = () => {
    const image = canvasRef.current.toDataURL("image/png");
    onPredict(image);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="bg-black rounded-lg border border-slate-600 touch-none
                     w-64 h-64 sm:w-[280px] sm:h-[280px]"
          onMouseDown={start}
          onMouseUp={stop}
          onMouseMove={draw}
          onMouseLeave={stop}
          onTouchStart={start}
          onTouchEnd={stop}
          onTouchMove={draw}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={predict}
          disabled={disabled}
          className="px-4 py-3 sm:py-2 rounded-lg bg-sky-500 text-slate-900 font-medium
             hover:bg-sky-400 disabled:opacity-50"
        >
          Predict
        </button>

        <button
          onClick={clear}
          className="px-4 py-2 rounded-lg bg-slate-700 text-gray-200
                     hover:bg-slate-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
