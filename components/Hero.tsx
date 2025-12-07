import React, { useContext } from 'react'
import { ProfileContext } from './context/context'

const Hero = () => {
  const {homeRef} = useContext(ProfileContext)
  return (
    <div className='h-screen w-full justify-center items-center flex flex-col ' ref={homeRef}>
        <h1 className='text-[18px] font-bold ' >Ramprasad Yadav</h1>
        <p>Full Stack Developer</p>
        
    </div>
  )
}

export default Hero