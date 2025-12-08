import React, { useContext } from 'react'
import { ProfileContext } from './context/context'

const Project = () => {
  const {projectRef} = useContext(ProfileContext)
  return (
      <div
      ref={projectRef}
      className="h-screen w-full md:w-[100vw] justify-center items-center flex flex-col bg-[#000e25] text-white overflow-hidden"
    >
      Projects
    </div>
  )
}

export default Project