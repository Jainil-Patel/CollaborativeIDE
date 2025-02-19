import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";

const AvatarDropdown = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);



    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Dropdown content
    const dropdownMenu = (
        <div 
            ref={dropdownRef} 
            className="fixed top-14 right-4 z-[9999] w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
        >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{user.name}</div>
                <div className="font-medium truncate">{user.email}</div>
            </div>

            <div>
                <button onClick={async()=>{ await logout()}} className="rounded-b-lg block dark:hover:bg-red-400 dark:hover:text-white w-full h-full text-left px-4 py-3 text-sm text-red-400  dark:text-red-400">
                    Sign out
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div className="relative">
                {/* Avatar Button */}
                <div 
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative inline-flex cursor-pointer items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                >
                    <span className="font-medium select-none text-gray-600 dark:text-gray-300">J</span>
                </div>
            </div>

            {/* Render dropdown using Portal */}
            {isOpen && createPortal(dropdownMenu, document.body)}
        </>
    );
};

export default AvatarDropdown;
