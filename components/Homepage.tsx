"use client";
import dynamic from "next/dynamic";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
const Hero =dynamic(()=>import('./Hero'),{
  ssr:false
});
const About =dynamic(()=>import('./About'),{
  ssr:false
});
const Project =dynamic(()=>import('./Project'),{
  ssr:false
});
const Contact =dynamic(()=>import('./Contact'),{
  ssr:false
});


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
