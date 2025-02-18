import logo from "../assets/logo.png"
import {memo} from "react"

const Navbar = () => {
    return (
        <nav className='flex fixed items-center w-full h-14 bg-[#252526] border-b border-[#3C3C3C]'>
          <div className="flex justify-between items-center w-full px-4">
            <div>
              <img src={logo} className="w-8  select-none h-8" alt="logo" />
            </div>
            
              <div className="cursor-pointer">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="size-8 text-[#505050] hover:text-green-400 hover:drop-shadow-[0_0_8px_#a3e635] transition duration-100"
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                </svg>      

              </div>
              <div className="text-[#D4D4D4] border-2 rounded-xl hover:bg-[#3C3C3C] select-none cursor-pointer px-4 py-1 border-[#3C3C3C]">
                Signup
              </div>
          </div>
        </nav>
      );
      
}

export default memo(Navbar);