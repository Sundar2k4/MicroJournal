import React from "react";
import Journal from "./Components/Journal";
import Streak from "./Components/Streak";
import TaskManager from "./Components/TaskManager";

const App = () => {
  return (
    <div>
      <Streak />
      <Journal />
    </div>
  );
};

export default App;
