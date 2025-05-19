"use client"
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import SideMunu from './SideMunu';

const MobileMenu = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
    <button onClick={()=> setIsSidebarOpen(!isSidebarOpen)}>
        <AlignLeft className='hover: text-darkColor hoverEffect 
        md:hidden hover:cursor-pointer'/>
    </button>
    <div>
        <SideMunu isOpen={isSidebarOpen}
        onClose={()=> setIsSidebarOpen(false)}/>
    </div>
    </>
  )
}

export default MobileMenu
