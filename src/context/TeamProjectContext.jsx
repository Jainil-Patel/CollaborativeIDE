import React, { createContext, useState, useContext } from "react";
import { useAuth } from "./AuthContext";

// Create Context
const TeamProjectContext = createContext();

// Custom Hook to use ProjectContext
export const useTeamProject = () => useContext(TeamProjectContext);

// Provider Component
export const TeamProjectProvider = ({ children }) => {
    const [currentTeamProject, setCurrentTeamProject] = useState(null);
    const [selectedTeamFile, setSelectedTeamFile] = useState({ name: "", content: "" , path: ""});

    const {user} = useAuth();
    const teamID = user.email;

    return (
        <TeamProjectContext.Provider value={{ currentTeamProject, setCurrentTeamProject, selectedTeamFile, setSelectedTeamFile, userEmail }}>
            {children}
        </TeamProjectContext.Provider>
    );
};
