import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const shapes = ["Triangle", "Circle", "Square"];
const HumanCheckerContext = createContext();

export function useHumanChecker() {
  return useContext(HumanCheckerContext);
}

export function HumanCheckerProvider({ children }) {
  const [currentShape, setCurrentShape] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [redoStack, setRedoStack] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState([]);
  const canvasRef = useRef(null);

  // -------------------------
  // Utils
  // -------------------------
  const indexRef = useRef(0);

  const getNextShape = () => {
    const shape = shapes[indexRef.current];
    indexRef.current = (indexRef.current + 1) % shapes.length;
    return shape;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff"; // canvas white background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => clearCanvas(), []);
  useEffect(() => {if (!currentShape) setCurrentShape(getNextShape());}, [currentShape]);
  
  // -------------------------
  // Handlers
  // -------------------------
  const handleNext = () => {
    setCurrentShape(getNextShape());
    setPrediction(null);
    setFeedback("");
    clearCanvas();
    setHistory([]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const newHistory = [...history];
    const last = newHistory.pop();
    setRedoStack([last, ...redoStack]);
    setHistory(newHistory);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newHistory.forEach((img) => ctx.putImageData(img, 0, 0));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const [next, ...rest] = redoStack;
    setRedoStack(rest);
    setHistory([...history, next]);
    ctx.putImageData(next, 0, 0);
  };

  const handleClear = () => {
    clearCanvas();
    setPrediction(null);
    setFeedback("");
    setHistory([]);
    setRedoStack([]);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000000";

    const rect = canvas.getBoundingClientRect();
    const getPointerPos = (ev) => ev.touches
      ? { x: ev.touches[0].clientX - rect.left, y: ev.touches[0].clientY - rect.top }
      : { x: ev.clientX - rect.left, y: ev.clientY - rect.top };

    const { x: sx, y: sy } = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(sx, sy);

    let drawing = true;

    const draw = (ev) => {
      ev.preventDefault();
      if (!drawing) return;
      const { x, y } = getPointerPos(ev);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stop = () => {
      drawing = false;
      ctx.closePath();
      try {
        setHistory([...history, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
      } catch {}
      setRedoStack([]);
      window.removeEventListener("mousemove", draw);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", draw);
      window.removeEventListener("touchend", stop);
    };

    window.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", draw, { passive: false });
    window.addEventListener("touchend", stop);
  };

  // -------------------------
  // 1️⃣convert canvas to blob
  // -------------------------
  const canvasToBlob = (canvas) =>
    new Promise((resolve, reject) => {
      if (!canvas) return reject(new Error("Canvas not available"));
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to convert canvas to blob"));
      });
    });

  // -------------------------
  // send to backend and get prediction
  // -------------------------
  const fetchPrediction = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "drawing.png");

    const resp = await fetch("https://humancheckerbackend.onrender.com/predict", {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("Network response was not ok");
    return await resp.json();
  };

  // -------------------------
  // update statuses
  // -------------------------
  const updatePredictionFeedback = (data, currentShape, setPrediction, setFeedback) => {
    setPrediction({
      shape: data.predicted_shape,
      confidence: Math.round(data.confidence * 100),
    });

    setFeedback(
      data.predicted_shape === currentShape
        ? `✅ Correct! You are human 😎`
        : `❌ Oops! Try again.`
    );
  };

  // -------------------------
  // handleCheck
  // -------------------------
  const handleCheck = async () => {
    if (!canvasRef.current) return;

    try {
      const blob = await canvasToBlob(canvasRef.current);
      const data = await fetchPrediction(blob);
      updatePredictionFeedback(data, currentShape, setPrediction, setFeedback);
    } catch (err) {
      console.error(err);
      setFeedback("⚠️ Error contacting the backend.");
    }
  };

  // -------------------------
  // Provider
  // -------------------------
  return (
    <HumanCheckerContext.Provider
      value={{
        currentShape,
        canvasRef,
        startDrawing,
        handleCheck,
        handleNext,
        handleUndo,
        handleRedo,
        handleClear,
        prediction,
        feedback
      }}
    >
      {children}
    </HumanCheckerContext.Provider>
  );
}