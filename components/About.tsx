"use client";
import React, { useContext } from "react";
import { ProfileContext } from "./context/context";
import { iconList } from "./icons/IconList";
import Image from "next/image";
import { TextAnimate } from "./ui/text-animate";

const About = () => {
  const { aboutRef } = useContext(ProfileContext);
  return (
    <div
      ref={aboutRef}
      className="md:h-screen w-screen py-10 md:py-0 justify-center items-center flex flex-col bg-[#000e25] text-white overflow-hidden"
    >
      <div className="w-full  md:w-3xl lg:w-5xl xl:w-7xl p-5" >

      <div className="w-full flex flex-col justify-center items-center gap-y-4 text-center">
        <h1 className=" text-xl sm1:text-4xl josefin font-bold">About Me</h1>
      <p className=" text-[16px] sm1:text-[18px] ">I specialize in JavaScript-based technologies such as React, Next.js, TypeScript, Tailwind CSS, Node.js, 
Express, MongoDB, and various developer tools. I love combining clean UI with strong backend logic to create 
applications that are both intuitive and performant.</p>
      </div>
      
      <div className="flex gap-5 px-4 flex-wrap mt-5 text-center justify-center ">
        {iconList.map((item, index) => {
          return (
            <div
             className=" p-4 rounded-lg bg-gray-500/20 backdrop-blur-2xl shadow-lg md:shadow-2xl hover:scale-115 hover:-translate-y-1 transition-transform duration-250"
              key={index}
            >
              <Image className="w-10 md:w-13 h-10 md:h-13 " src={item.src} alt="" />
            </div>
          );
        })}
      </div>
       </div>
    </div>
  );
};

export default About;
