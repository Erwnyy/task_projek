import Image from "next/image";
import Service from "./service";
import Link from "next/link";
import { BiLogIn, BiLogOut, BiHome } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import Router from "next/router";

const Index = ({ type = "LIGHT" }) => {
  
  const removeItem = () => {
    console.log('Logout app')
    localStorage.clear();
    Router.push({
      pathname: '/login',
      query: { login: 'login' }
  })
  }

  return (
    <div className="flex justify-center w-full">
      <div className='h-[70px] z-50 fixed overflow-hidden mt-2 rounded-full top-0 w-[80vh] md:w-[70vh] sm:rounded-none sm:mt-0  sm:w-[100%] bg-white md:left-1/2 md:-translate-x-1/2'>
        <div className="flex h-full  items-center pt-2">
          <div className="flex justify-around  w-full m-6 py-9 cursor-pointer ">
            <Link href="/" className="no-underline hover:underline hover:underline-offset-8 hover:decoration-4">
              <div className="flex justify-center flex-col text-slate-400">
                <div className="mb-[-15px] w-full flex justify-center" >
                  <BiHome size={27} />
                </div>
                <p >Home</p>
              </div>
            </Link>
            <Link href="/login" className="no-underline hover:underline hover:underline-offset-8 hover:decoration-4">
              <div className="flex justify-center flex-col text-slate-400">
                <div className="mb-[-15px] w-full flex justify-center" >
                  <BiLogIn size={27} />
                </div>
                <p >Login</p>
              </div>
            </Link>
              <div onClick={removeItem} className="flex justify-center flex-col text-slate-400 no-underline hover:underline hover:underline-offset-8 hover:decoration-4">
                <div className="mb-[-15px] w-full flex justify-center" >
                  <BiLogOut size={28} />
                </div>
                <p >Logout</p>
              </div>
            <Link href="#" className="no-underline hover:underline hover:underline-offset-8 hover:decoration-4">
              <div className="flex justify-center flex-col text-slate-400 ">
                <div className="mb-[-15px] w-full flex justify-center" >
                  <FaRegUser size={26} />
                </div>
                <p >Profile</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
