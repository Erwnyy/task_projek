import React from 'react'
import dynamic from "next/dynamic";

const SectionLogin = dynamic(() => import("@/components/molecules/login"));

const Index = () => {
  return (
    <div className='flex mt-28'>
        <SectionLogin/>
    </div>
  )
}

export default Index