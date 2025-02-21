import React, { createContext, useState, useContext } from "react";
import { useAuth } from "./AuthContext";

// Create Context
const ProjectContext = createContext();

// Custom Hook to use ProjectContext
export const useProject = () => useContext(ProjectContext);

// Provider Component
export const ProjectProvider = ({ children }) => {
    const [currentProject, setCurrentProject] = useState(null);
    const [selectedFile, setSelectedFile] = useState({ name: "", content: "" , path: ""});

    const {user} = useAuth();
    const userEmail = user.email;

    return (
        <ProjectContext.Provider value={{ currentProject, setCurrentProject, selectedFile, setSelectedFile, userEmail }}>
            {children}
        </ProjectContext.Provider>
    );
};
