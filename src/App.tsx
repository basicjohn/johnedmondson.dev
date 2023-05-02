// Dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./App.scss";

// Pages
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import Home from "./pages/Home/Home";
import Contact from "pages/Contact/Contact";
import Container from "Components/Container/Container";
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";

// Components
import AnimatedBackground from "Components/AnimatedBackground/AnimatedBackground";

const App = () => {
  return (
    <div className="app">
      {/* <Container> */}
      <Header />
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/beta" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      {/* </Container> */}
      <AnimatedBackground />
    </div>
  );
};

export default App;
