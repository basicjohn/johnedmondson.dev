// dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home/Home";
import Contact from "pages/Contact/Contact";
import NonContactTech from "pages/portfolio/NonContactTech/NonContactTech";
import IonChannel from "pages/portfolio/IonChannel/IonChannel";
import Container from "Components/Container/Container";
import Header from "Patterns/Header/Header";
import Footer from "Patterns/Footer/Footer";

// components
import AnimatedBackground from "Patterns/AnimatedBackground/AnimatedBackground";

// styles
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Container>
        <Header />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio">
          <Route path="ion-channel" element={<IonChannel />} />
          <Route path="non-contact-tech" element={<NonContactTech />} />
        </Route>
      </Routes>
      <Container>
        <Footer />
      </Container>
      <AnimatedBackground />
    </div>
  );
};

export default App;
