import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:5000/getgoal");
      const data = await res.json();
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const toggleSubtask = async (goalId, subtaskIndex, currentStatus) => {
    try {
      await fetch(
        `http://localhost:5000/goals/${goalId}/subtask/${subtaskIndex}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ iscompleted: !currentStatus }),
        }
      );

      getData();
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-10 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-md rounded-xl border border-black p-10">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Goal Tracker
        </h1>

        <button
          onClick={() => navigate("/addgoal")}
          className="mb-6 bg-white border border-black text-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition"
        >
          ➕ Add New Goal
        </button>

        {goals.length === 0 ? (
          <p className="text-center text-gray-500">No goals found.</p>
        ) : (
          goals.map((goal) => (
            <div
              key={goal._id}
              className="mb-6 p-4 border border-black rounded-md shadow"
            >
              <h2 className="text-xl font-semibold">{goal.goal}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Due: {goal.duedate?.substring(0, 10)}
              </p>

              <ul className="space-y-2">
                {goal.subtasks.map((subtask, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center px-3 py-2 rounded-md ${
                      subtask.iscompleted
                        ? "bg-gray-200 line-through text-gray-500"
                        : "bg-white"
                    }`}
                  >
                    <span>{subtask.title}</span>
                    <input
                      type="radio"
                      checked={subtask.iscompleted}
                      onChange={() =>
                        toggleSubtask(goal._id, index, subtask.iscompleted)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalTracker;
