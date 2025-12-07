"use client";
import { createContext, useEffect, useRef, useState } from "react";

export const ProfileContext = createContext<any>(null);

const ProfileContextProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<Boolean>(true);

  const homeRef = useRef<any>(null);
  const aboutRef = useRef<any>(null);
  const contactRef = useRef<any>(null);
  const projectRef = useRef<any>(null);

  const scrollTo = (ref: any) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  const value = {
    darkMode,
    setDarkMode,
    homeRef,
    aboutRef,
    contactRef,
    projectRef,
    scrollTo,
  };

  return (
    <>
      <ProfileContext.Provider value={value}>
        {children}
      </ProfileContext.Provider>
    </>
  );
};

export default ProfileContextProvider;
