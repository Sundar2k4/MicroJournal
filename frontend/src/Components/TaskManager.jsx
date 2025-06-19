import React, { useEffect, useState } from "react";
import ProductivityTimer from "./ProductivityTimer";

function TaskManager() {
  const [task, setTask] = useState("");
  const [reminders, setReminders] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch("https://microjournal-backend.onrender.com/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: task }),
    });

    if (data.ok) {
      setTask("");
      fetchTasks();
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://microjournal-backend.onrender.com/tasks"
      );
      const data = await response.json();
      setReminders(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await fetch(
        `https://microjournal-backend.onrender.com/delete/${id}`
      );
      if (response.ok) {
        console.log("Successfully deleted task");
      }

      setReminders((prevData) => prevData.filter((task) => task._id !== id));
      await fetchTasks();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex justify-center items-start p-10 gap-100vh ml-30">
      <div className="border border-black mx-auto p-10 mr-100 rounded-xl flex-shrink-0">
        <div className="min-h-screen py-10 px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            TaskManager
          </h2>
          <div className="">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter Your Task or Reminder!"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button
                type="submit"
                className="bg-white border border-black text-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition"
              >
                Create
              </button>
            </form>

            <ul className="space-y-2 mt-6">
              {reminders.map((item) => (
                <li
                  key={item._id}
                  className="bg-gray-100 p-3 rounded-md shadow-md"
                >
                  <div>
                    <span className="flex justify-between w-full items-center cursor-pointer">
                      {item.task}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="size-5 hover:bg-red-400 rounded-md"
                        onClick={() => {
                          handledelete(item._id);
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProductivityTimer />
    </div>
  );
}

export default TaskManager;
