"use client";
import React, { useContext } from "react";
import { ProfileContext } from "./context/context";
import { iconList } from "./icons/IconList";
import Image from "next/image";

const About = () => {
  const { aboutRef } = useContext(ProfileContext);
  const Icons = [];
  return (
    <div
      ref={aboutRef}
      className="h-screen w-full justify-center items-center flex flex-col bg-[#000e25] text-white overflow-hidden"
    >
      <div className="w-full w-xs:2-xl sm:w-3xl lg:w-5xl xl:w-7xl" >

     
      
      <div className="flex gap-4 flex-wrap mt-5 text-center justify-center ">
        {iconList.map((item, index) => {
          return (
            <div
             className=" p-4 rounded-lg bg-gray-500/20 backdrop-blur-2xl shadow-lg md:shadow-2xl"
              key={index}
            >
              <Image className="w-10 md:w-13 h-10 md:h-13" src={item.src} alt="" />
            </div>
          );
        })}
      </div>
       </div>
    </div>
  );
};

export default About;
