import Link from 'next/link'
import React, { useContext } from 'react'
import { ProfileContext } from '../context/context'
import logo from '../logo/logo.png'
import Image from 'next/image'

const Navbar = () => {
  const {homeRef, aboutRef, projectRef, contactRef, scrollTo} = useContext(ProfileContext)
  return (
    <div className='flex w-full justify-between sm:justify-around items-center p-4 fixed inset-x-0 top-0  z-50 text-white ' style={{backdropFilter:"blur(10px)"}} >
      <div>
        <Image className='cursor-pointer h-[30px] sm:h-[50px] w-[55px] sm:w-[75px]  ' onClick={()=> scrollTo(homeRef)}  src={logo.src} alt='' height={50} width={50} />
        {/* <p  className='text-2xl font-bold cursor-pointer' onClick={()=>scrollTo(homeRef)} >RPY</p> */}
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