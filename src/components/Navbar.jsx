import logo from "../assets/logo.png";
import { memo } from "react";
import AvatarDropdown from "./AvatarDropdown";

const Navbar = () => {
    return (
        <nav className="flex fixed items-center w-full h-14 bg-[#252526] border-b border-[#3C3C3C]">
            <div className="flex justify-between items-center w-full px-4">
                <div>
                    <img
                        src={logo}
                        className="w-8  select-none h-8"
                        alt="logo"
                    />
                </div>

                <div className="cursor-pointer">
                   
                </div>

                
                <div className="relative inline-flex items-center space-x-4">
   
                    <AvatarDropdown/>


                </div>


            </div>
        </nav>
    );
};

export default memo(Navbar);
