import React, { useContext } from 'react'
import { ProfileContext } from './context/context'
import Image from 'next/image'
import Ecom from './logo/Ecomeerce.png'

const Project = () => {
  const {projectRef} = useContext(ProfileContext)
  const Projects = [
    {
      title: "E-Commerce Store",
    description:
      "A full-stack e-commerce application with cart features, product filtering, authentication, and payment integration.",
    image: Ecom,
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://your-ecommerce-demo.com",
    github: "https://github.com/yourname/ecommerce"
    }
  ]
  return (
      <div
      ref={projectRef}
      className="md:h-screen w-full py-10 md:py-0 md:w-[100vw] justify-center items-center flex flex-col bg-[#000e25] text-white overflow-hidden"
    >
     <div className="w-full  md:w-3xl lg:w-5xl xl:w-7xl p-5" >
      <div className='flex flex-col gap-y-5 my-5 text-center ' >
        <h1 className=' text-4xl  font-bold '>My Projects</h1>
        <p className=' text-[18px]'>Here are some of the projects I’ve built using modern tools and technologies. Each project reflects my passion for clean UI, strong backend architecture, and creating real-world solutions through code.
        </p>
      </div>
     
      {
        Projects.map((item,index)=>{
          return(
           
            <div className='flex flex-col md:flex-row  items-center w-full gap-x-5 border rounded-2xl p-5 mt-5' key={index}>
               <div className='  lg:w-1/2'>
                <Image src={item.image.src} className=' g-[200px] sm:h-[300px] md:h-[250px] lg:h-[300px] w-full md:w-[650px] lg:w-full bg-cover rounded-lg' height={500} width={500} alt="not found" />
               </div>
               <div className='flex flex-col gap-y-5  lg:w-1/2 p-5'>
                  <h1 className=' text-2xl lg:text-4xl font-bold'>{item.title}</h1>
                  <p className=' text-[16px] lg:text-[18px] font-semibold'>{item.description}</p>
                  <div className='flex gap-x-2 lg:gap-x-5'>

                  {
                    item.tech.map((t,index)=>{
                      return(
                        // <div key={index} className=' flex gap-5'>
                          <span className='py-2 px-4 border rounded-2xl bg-blue-950' key={index}>{t}</span>
                        // </div>
                      )
                    })
                  }
                  </div>
                <div className='flex gap-x-5 mt-2 lg:mt-10'>
                <a href={item.link}>Live</a>
                <a href={item.github}>Github</a>
                </div>

               </div>
            </div>
           
          )
        })
      }
     </div>
    </div>
  )
}

export default Project