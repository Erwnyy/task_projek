import React from 'react'
import dynamic from "next/dynamic";

const SectionHome = dynamic(() => import("@/components/molecules/home"));

const Index = () => {
  return (
    <div className='flex mt-28'>
        <SectionHome/>
    </div>
  )
}

export default Index