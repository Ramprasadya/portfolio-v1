"use client";
import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { DotPattern } from "./ui/dot-pattern";
import { ProfileContext } from "./context/context";
import { motion } from "framer-motion";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero";
import About from "./About";
import Contact from "./Contact";
import Project from "./Project";

const Homepage = () => {
  const { darkMode, setDarkMode} = useContext(ProfileContext);
  console.log(darkMode);
  const parent = {
    show: {
      transition: { staggerChildren: 0.25 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };



  return (
    <div className="w-full relative justify-center items-center flex flex-col ">
      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
      >
        <Navbar/>
        {/* <section className={` w-full w-xs:2-xl sm:w-3xl lg:w-5xl xl:w-7xl  `} > */}
          <Hero />
          <About/>
          <Project/>
          <Contact/>
        {/* </section> */}
      </motion.div>
    </div>
  );
};

export default Homepage;
