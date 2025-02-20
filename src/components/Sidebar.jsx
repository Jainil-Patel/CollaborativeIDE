import React, { useState } from "react";
import SidebarButton from "./SidebarButton"; // Import SidebarButton component
import ProjectCreator from "./ProjectCreator";
import ProjectList from "./ProjectList";
import Explorer from "./Explorer";
import { useProject } from "../context/ProjectContext";

// Updated homeIcon path
const homeIcon =
    "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25";
const folderIcon =
    "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z";
const teamIcon =
    "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z";

const Sidebar = ({ setSidebarWidth }) => {
    const [activeSidebar, setActiveSidebar] = useState(null);
    const { currentProject } = useProject(); // Get current project from context

    const toggleSubSidebar = (sidebar) => {
        if (activeSidebar === sidebar) {
            setSidebarWidth(64);
            setActiveSidebar(null);
        } else {
            setSidebarWidth(320);
            setActiveSidebar(sidebar);
        }
    };

    return (
        <div className="w-16 bg-[#1B1C1D] border-r border-[#3C3C3C] h-screen fixed top-14 left-0 flex flex-col items-center py-2">
            {/* Sidebar Buttons */}
            <SidebarButton
                icon={homeIcon}
                onClick={() => toggleSubSidebar("home")}
                active={activeSidebar === "home"}
            />
            <SidebarButton
                icon={folderIcon}
                onClick={() => toggleSubSidebar("explorer")}
                active={activeSidebar === "explorer"}
            />
            <SidebarButton
                icon={teamIcon}
                onClick={() => toggleSubSidebar("team")}
                active={activeSidebar === "team"}
            />

            {/* Home Sidebar */}
            {activeSidebar === "home" && (
                <div className="w-64 select-none font-mono text-[#D4D4D4] bg-[#1B1C1D] border-r border-[#3C3C3C] h-screen fixed top-14 left-16 flex flex-col items-center py-2">
                    <ProjectCreator />
                    <ProjectList />
                </div>
            )}

            {/* Explorer Sidebar */}
            {activeSidebar === "explorer" && (
                <div className="w-64 select-none font-mono text-[#D4D4D4] bg-[#1B1C1D] border-r border-[#3C3C3C] h-screen fixed top-14 left-16 flex flex-col items-center py-2">
                    {currentProject ? (
                        <Explorer projectName={currentProject} />
                    ) : (
                        <p className="text-gray-400 mt-2">Select a project first</p>
                    )}
                </div>
            )}

            {/* Team Sidebar */}
            {activeSidebar === "team" && (
                <div className="w-64 select-none font-mono text-[#D4D4D4] bg-[#1B1C1D] border-r border-[#3C3C3C] h-screen fixed top-14 left-16 flex flex-col items-center py-2">
                    <p>Team</p>
                    {/* Future team management UI can go here */}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
