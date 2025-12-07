import React, { useContext } from 'react'
import { ProfileContext } from './context/context'

const About = () => {
    const {aboutRef} = useContext(ProfileContext)
  return (
    <div ref={aboutRef} className='h-screen w-full justify-center items-center flex flex-col' >
            <p className='text-[16px]' >Full-stack developer creating fast, scalable web applications. Passionate about clean code, modern frameworks, and seamless user experiences.</p>
    </div>
  )
}

export default About