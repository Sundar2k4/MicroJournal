import React, { useState, useEffect } from "react";

export default function ProductivityTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="border border-black p-10 rounded-xl ml-[-180px] flex flex-col items-center gap-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold">Productivity Timer</h2>
      <h1 className="text-3xl font-mono">{formatTime(seconds)}</h1>
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="bg-white border border-black text-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-white border border-red-500 text-black px-5 py-2 rounded-md hover:bg-red-400 hover:text-white transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
