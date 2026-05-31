"use client";
import React, { useContext } from "react";
import { ProfileContext } from "./context/context";
import { LightRays } from "./ui/light-rays";

const Hero = () => {
  const { homeRef } = useContext(ProfileContext);

  return (
    <div
      ref={homeRef}
      className="relative h-screen w-[100vw] flex justify-center items-center overflow-hidden bg-[#000e25] text-white"
    >
      {/* Background Light Rays */}
      <LightRays className="absolute inset-0 w-full h-full z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:gap-y-2 text-center w-full  md:w-3xl lg:w-5xl xl:w-7xl p-4">
        {/* <Navbar /> */}
        <h1 className=" text-3xl sm1:text-5xl md:text-6xl leading-0 font-bold josefin"> Ramprasad Yadav</h1>
        <div className=" text-xl sm1:text-2xl md:text-3xl josefin mt-10">Full Stack Developer (React, Next.js, Node.js)</div>
        <div className="text-[16px] w-full px-2 sm1:text-[16px] md:text-[18px] mt-1">
          Passionate about clean code, modern frameworks, and seamless user
          experiences. I build and deploy production-grade applications, not just UI.
        </div>
      </div>
    </div>
  );
};

export default Hero;
