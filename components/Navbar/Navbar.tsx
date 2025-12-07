import Link from 'next/link'
import React, { useContext } from 'react'
import { ProfileContext } from '../context/context'

const Navbar = () => {
  const {homeRef, aboutRef, projectRef, contactRef, scrollTo} = useContext(ProfileContext)
  return (
    <div className='flex w-full justify-around items-center p-4 fixed top-0 ' >
      <div>
        <p  className='text-2xl font-bold cursor-pointer' onClick={()=>scrollTo(homeRef)} >RPY</p>
      </div>
      <div className='flex items-center gap-x-4 ' >
        <p className='cursor-pointer' onClick={()=>scrollTo(aboutRef)} >About</p>
        <p className='cursor-pointer' onClick={()=> scrollTo(projectRef)}  >Project</p>
        <p className='cursor-pointer' onClick={()=> scrollTo(contactRef)} >Contact</p>
      </div>
    </div>
  )
}

export default Navbar