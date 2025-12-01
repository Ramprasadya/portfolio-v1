"use client"
import { createContext, useEffect, useState } from "react"


export const ProfileContext = createContext<any>(null);

const ProfileContextProvider =({children}:any)=>{

    const [darkMode, setDarkMode] = useState<Boolean>(true)

    useEffect(()=>{
        let body =document.getElementsByTagName('body')
    })

    const value={
       darkMode,
       setDarkMode
    }

    return(
        <>
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
        </>
    )
}

export default ProfileContextProvider