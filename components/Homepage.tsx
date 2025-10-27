"use client"
import React from 'react'
import { cn } from "@/lib/utils"
import { DotPattern } from './ui/dot-pattern'

const Homepage = () => {
  return (
   <>
   <div className='relative'>

    <div className=" bg-background absolute flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
   <div className='z-50' >
<p>hellpo</p>
   </div>
    </div>
   </>
  )
}

export default Homepage