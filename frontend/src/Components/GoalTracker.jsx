import React from "react";
import { useNavigate } from "react-router-dom";

const GoalTracker = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white py-10 px-10 gap-100px flex">
      <div className="max-w-xl bg-white/20 backdrop-blur-md mx-auto  rounded-xl border border-black-500 p-10 ml-0">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          GoalTracker
        </h1>
        <button
          onClick={() => {
            navigate("/addgoal");
          }}
          className="bg-white border border-black text-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition"
        >
          Add Goal
        </button>
      </div>
    </div>
  );
};

export default GoalTracker;
