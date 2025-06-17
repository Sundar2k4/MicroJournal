import React from "react";
import { Routes, Route } from "react-router-dom";

import Journal from "./Components/Journal";
import Streak from "./Components/Streak";
import TaskManager from "./Components/TaskManager";
import GoalTracker from "./Components/GoalTracker";
import GoalForm from "./Components/Goalform";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Streak />
            <Journal />
            <GoalTracker />
          </div>
        }
      />
      <Route path="/addgoal" element={<GoalForm />} />
    </Routes>
  );
};

export default App;
