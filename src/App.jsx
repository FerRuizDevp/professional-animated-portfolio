import "./App.css";
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectSorting from "./components/ProjectSorting";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <About />
      <ProjectSorting />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
