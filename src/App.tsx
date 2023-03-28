// Dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./App.scss";

// Components
import ComingSoon from "./components/ComingSoon/ComingSoon";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/beta" element={<Home />} />
      </Routes>
    </div>
  );
};
export default App;
