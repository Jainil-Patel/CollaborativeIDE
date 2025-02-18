import React from "react";

const SidebarButton = ({ icon, onClick, active }) => {
    return (
        <div
            className={`w-12 h-12 flex items-center justify-center cursor-pointer transition duration-200 
        ${active ? "text-green-500" : "text-[#505050]"}`} // Change color if active
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={icon} // Use the passed icon path
                />
            </svg>
        </div>
    );
};

export default SidebarButton;
