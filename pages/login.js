import dynamic from 'next/dynamic'
import React from 'react'

const Dashboard = dynamic(() => import('components/organisms/login'));
const Templates = dynamic(() => import('components/template'));

export default function Login() {
  return (
    <div className='bg-slate-200'>
      <Templates title={'Landing Page'} theme="LIGHT">
        <Dashboard/>
      </Templates>
    </div>
  )

}