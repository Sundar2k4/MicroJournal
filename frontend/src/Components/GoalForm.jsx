import React, { useState } from "react";

const GoalForm = () => {
  const [goal, setGoal] = useState("");
  const [due, setDue] = useState("");
  const [subtasks, setSubTasks] = useState([{ title: "" }]);

  const handleSubtaskChange = (index, value) => {
    const updated = [...subtasks];
    updated[index].title = value;
    setSubTasks(updated);

    if (index === subtasks.length - 1 && value.trim() !== "") {
      setSubTasks([...updated, { title: "" }]);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const filteredsubtasks = subtasks
      .map((s) => ({ ...s, isCompleted: false }))
      .filter((s) => s.title.trim() !== "");

    const payload = { goal, due, subtasks: filteredsubtasks };

    try {
      const res = await fetch("http://localhost:5000/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Goal added!");
        setGoal("");
        setDue("");
        setSubTasks([{ title: "" }]);
      } else {
        alert("Failed to add goal");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-10 flex ml-130">
      <div className="max-w-xl bg-white/20 backdrop-blur-md mx-auto rounded-xl border border-black-500 p-10">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          GoalForm
        </h1>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter the Goal"
            className="border px-2 py-1 w-full mb-3"
            required
          />
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="border px-2 py-1 w-full mb-3"
          />
          <div className="space-y-2 mb-4">
            {subtasks.map((subtask, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Subtask ${index + 1}`}
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                className="border rounded-md px-2 py-1 w-full"
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-white border border-black text-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition"
          >
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;
