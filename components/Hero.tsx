import React, { useContext } from 'react'
import { ProfileContext } from './context/context'
import Navbar from './Navbar/Navbar'

const Hero = () => {
  const {homeRef} = useContext(ProfileContext)
  return (
    <div className='h-screen w-full relative justify-center items-center flex flex-col overflow-hidden  ' ref={homeRef}>
       <Navbar  />
        <h1 className='text-[20px] font-bold ' >Ramprasad Yadav</h1>
        <p>Full Stack Developer</p>
        
    </div>
  )
}

export default Hero