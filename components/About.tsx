import React, { useContext } from 'react'
import { ProfileContext } from './context/context'

const About = () => {
    const {aboutRef} = useContext(ProfileContext)
  return (
    <div ref={aboutRef}>About</div>
  )
}

export default About