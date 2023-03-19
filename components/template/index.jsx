import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import('./header'));
const MenuBar = dynamic(() => import('./menubar'));
// const Auth = dynamic(() => import('auth/Auth'), { ssr: false });

const Index = ({ children, title }) => {

  return (
    <React.Fragment>
        <Header title={title} />
        <main className="h-screen w-full z-20">
          <div>
            <MenuBar />
            {children}
          </div>
        </main>
    </React.Fragment>
  )
}

export default Index;