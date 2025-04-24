import React from "react";
import { useEffect, useState } from "react";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setEntries([data, ...entries]);
      setContent("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 ml-0">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          😊 Micro Journal
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-4"
        >
          <input
            type="text"
            value={content}
            maxLength={140}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your one-liner..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-cyan-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add
          </button>
        </form>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <ul className="space-y-2">
          {entries.map((entry) => (
            <li
              key={entry._id}
              className="bg-gray-50 p-3 rounded-md shadow border border-gray-200"
            >
              <span className="font-semibold text-gray-700">{entry.date}</span>:{" "}
              {entry.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Journal;
