import React, { useEffect, useState } from "react";

const Streak = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetch("https://microjournal-backend.onrender.com/streak")
      .then((res) => res.json())
      .then((data) => setStreak(data.streak));
  }, []);

  return (
    <div className="flex justify-end bg-white border border-black">
      <h2 className="text-xl font-bold mb-9 text-black-500 flex mt-9 mr-9">
        <h1 className="mr-290 text-4xl">MultiPlanner</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
          />
        </svg>
        <span className="text-orange-500">{streak}</span> day
        {streak === 1 ? "" : "s"}
      </h2>
    </div>
  );
};

export default Streak;
