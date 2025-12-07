"use client";
import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { DotPattern } from "./ui/dot-pattern";
import { ProfileContext } from "./context/context";
import { motion } from "framer-motion";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero";
import About from "./About";

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
    <div className="w-full relative justify-center items-center flex flex-col p-2 md:p-4 ">
      <Navbar  />

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
      >
        <section className={` w-full sm:w-5xl md:w-7xl  `} >
          <Hero />
          <About/>
        </section>
      </motion.div>
    </div>
  );
};

export default Homepage;
