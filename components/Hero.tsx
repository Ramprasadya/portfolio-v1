"use client";
import React, { useContext } from "react";
import { ProfileContext } from "./context/context";
import Navbar from "./Navbar/Navbar";
import { LightRays } from "./ui/light-rays";
import { TextAnimate } from "./ui/text-animate";
import { SparklesText } from "./ui/sparkles-text";
import { TypingAnimation } from "./ui/typing-animation";

const Hero = () => {
  const { homeRef } = useContext(ProfileContext);

  return (
    <div
      ref={homeRef}
      className="relative h-screen w-full md:w-[100vw] flex justify-center items-center overflow-hidden bg-[#000e25] text-white"
    >
      {/* Background Light Rays */}
      <LightRays className="absolute inset-0 w-full h-full z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:gap-y-2 text-center w-full  md:w-3xl lg:w-5xl xl:w-7xl p-4">
        {/* <Navbar /> */}
        <h1 className=" text-3xl sm:text-5xl md:text-6xl leading-0 font-bold josefin"><TypingAnimation> Ramprasad Yadav</TypingAnimation></h1>
        <SparklesText sparklesCount={5} className=" text-[18px] sm:text-2xl md:text-3xl josefin">Full Stack Developer</SparklesText>
       
           <TextAnimate animation="blurInUp" by="character" once className=" text-[14px] sm:text-[16px] md:text-[18px] mt-1">
                Full-stack developer creating fast, scalable web applications.
                Passionate about clean code, modern frameworks, and seamless user
                experiences.
            </TextAnimate>
              
      </div>
    </div>
  );
};

export default Hero;
