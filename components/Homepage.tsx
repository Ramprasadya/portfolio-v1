"use client";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero";
import About from "./About";
import Contact from "./Contact";
import Project from "./Project";
import Footer from "./Footer/Footer";

const Homepage = () => {

  return (
    // <div className="w-full relative justify-center items-center flex flex-col ">
    <div>
      <Navbar />
      <Hero />
      <About />
      <Project />
      <Contact />
      <Footer/>
    </div>

    // </div>
  );
};

export default Homepage;
