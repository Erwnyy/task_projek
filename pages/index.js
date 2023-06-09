import dynamic from 'next/dynamic'
import React from 'react'

const Dashboard = dynamic(() => import('components/organisms/home'));
const Templates = dynamic(() => import('components/template'));

export default function Index() {
  return (
    <div className='bg-slate-200'>
      <Templates title={'Landing Page'} theme="LIGHT">
        <Dashboard />
      </Templates>
    </div>
  )

}