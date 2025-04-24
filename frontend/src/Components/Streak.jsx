import React, { useEffect, useState } from "react";

const Streak = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/streak")
      .then((res) => res.json())
      .then((data) => setStreak(data.streak));
  }, []);

  return (
    <div className="flex justify-end">
      <h2 className="text-xl font-bold mb-4 text-gray-500 ">
        🔥 Current Streak: <span className="text-orange-500">{streak}</span> day
        {streak === 1 ? "" : "s"}
      </h2>
    </div>
  );
};

export default Streak;
