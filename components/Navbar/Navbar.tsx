import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { ProfileContext } from '../context/context'
import logo from '../logo/logo.png'
import Image from 'next/image'
import { MenuIcon } from '@/lib/MenuIcon'
import { XIcon } from '@/lib/XIcon'

const Navbar = () => {
  const {homeRef, aboutRef, projectRef, contactRef, scrollTo} = useContext(ProfileContext)
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div className='p-4 fixed inset-x-0 top-0  z-50 text-white'  style={{backdropFilter:"blur(10px)"}} >
    <div className=' flex w-full justify-between sm:justify-around items-center  '>
      <div >
        <Image className='cursor-pointer h-[30px] sm:h-[50px] w-[55px] sm:w-[75px]  ' onClick={()=> scrollTo(homeRef)}  src={logo.src} alt='' height={50} width={50} />
        {/* <p  className='text-2xl font-bold cursor-pointer' onClick={()=>scrollTo(homeRef)} >RPY</p> */}
      </div>
      <div className=' hidden sm1:flex items-center gap-x-7 ' >
        <p className='cursor-pointer text-lg' onClick={()=>scrollTo(aboutRef)} >About</p>
        <p className='cursor-pointer text-lg' onClick={()=> scrollTo(projectRef)}  >Project</p>
        <p className='cursor-pointer text-lg' onClick={()=> scrollTo(contactRef)} >Contact</p>
      </div>
      <div className=' flex sm1:hidden' >
        <MenuIcon className='h-8 w-8' onClick={()=>setVisible(true)} />
      </div>
    </div>
    {/* Mobile Navbar */}
    <div className={`  absolute top-0 right-0 bottom-0 h-screen overflow-hidden bg-[#172d52] transition-all ${visible ? 'w-[55%]' : 'w-0'}`} >
      <div className="flex flex-col text-white" >
          <div onClick={() => setVisible(false)} className="flex items-center gap-2 p-3" >
            <XIcon className="h-4 rotate-90 mt-[3px]" />
            <p>Back</p>
          </div>
        <p className='cursor-pointer py-2 pl-6 ' onClick={()=>{scrollTo(homeRef); setVisible(false)}} >Home</p>
        <p className='cursor-pointer py-2 pl-6 ' onClick={()=>{scrollTo(aboutRef); setVisible(false)}} >About</p>
        <p className='cursor-pointer py-2 pl-6 ' onClick={()=> {scrollTo(projectRef); setVisible(false)}}  >Project</p>
        <p className='cursor-pointer py-2 pl-6 ' onClick={()=> {scrollTo(contactRef); setVisible(false)}} >Contact</p>
      </div>
    </div>
    </div>
  )
}

export default Navbar