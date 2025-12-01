import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex w-full justify-around items-center p-4' >
      <div>
        <p className='text-2xl font-bold' >RPY</p>
      </div>
      <div className='flex items-center gap-x-4' >
        <Link href="#about" >About</Link>
        <Link href="#about" >Project</Link>
        <Link href="#about" >Contact</Link>
      </div>
    </div>
  )
}

export default Navbar