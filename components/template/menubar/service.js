// import navbarMenu from 'constants/navbar.json';
import { useRouter } from 'next/router';
import { useState } from 'react';
const Service = (props) => {
  const { type } = props;
  const router = useRouter();
  const [active, setActive] = useState(false);
  const renderResource = () => {
    // switch(type){
    //   case 'LIGHT':
    //     return {
    //       image: "/images/logo.png",
    //       containerClass: "w-[25rem] z-10 flex flex-col bg-utama-somethinc text-black text-[16px] font-[700] flex top-0 z-50"
    //     }
    //   // default:
    //   //   return {
    //   //     image: "/images/utils/logo-color.png",
    //   //     containerClass: "w-full md:py-[20px] bg-white text-chameleon-2 items-center text-[16px] font-[700] flex justify-between px-[20px] top-0 z-50 fixed"
    //   //   }
    // }
  }

  const navbarMenu = () => {
    
  }

  return {
    renderResource,
    navbarMenu,
    router,
    active,
    setActive,
  }
}

export default Service;