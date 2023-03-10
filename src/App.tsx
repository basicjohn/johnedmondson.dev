// Dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./App.scss";

// Components
import ComingSoon from "./Components/ComingSoon/ComingSoon";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ComingSoon />} />
      </Routes>
    </div>
  );
};
export default App;
