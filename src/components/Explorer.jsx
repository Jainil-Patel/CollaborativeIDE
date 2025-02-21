import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";
import { useTeam } from "../context/TeamContext";


const Explorer = () => {
    const [fileStructure, setFileStructure] = useState([]);
    const { user } = useAuth();
    const { currentProject, setSelectedFile } = useProject();
    const {team} = useTeam();

    let userEmail = user?.email; // Default to logged-in user email

    // If team exists and has users, assign the first user's email
        if (team?.users?.length > 0) {
        userEmail = team.users[0].email;
        } // Ensure user exists

    useEffect(() => {
        if (!userEmail || !currentProject) return;

        const fetchFiles = async () => {
            try {
                const response = await axios.get("/projects/files", {
                    params: { userEmail, projectName: currentProject },
                });
                setFileStructure(response.data.files);
            } catch (error) {
                console.error("Error fetching project files:", error);
            }
        };

        fetchFiles();
    }, [userEmail, currentProject]); // Re-fetch when project changes

    const handleFileClick = async (filePath) => {
        try {
            const response = await axios.get("/projects/file-content", {
                params: { filePath },
            });
            setSelectedFile({ name: filePath.split("/").pop(), content: response.data.content , path : filePath});
        } catch (error) {
            console.error("Error fetching file content:", error);
        }
    };
    
    const renderFileTree = (files) => {
        return files.map((file) => (
            <div key={file.path} className="ml-4">
                {file.isDirectory ? (
                    <div>
                        <span className="font-bold text-blue-400">{file.name}/</span>
                        {file.children.length > 0 && renderFileTree(file.children)}
                    </div>
                ) : (
                    <div
                        className="cursor-pointer text-white hover:text-gray-300"
                        onClick={() => handleFileClick(file.path)} // ✅ Updates selected file in context
                    >
                        {file.name}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div>
        <div className="p-4 bg-[#1B1C1D] text-white w-64 border-r border-[#3C3C3C]">
            <h2 className="text-lg mb-2">Explorer</h2>
            {fileStructure.length > 0 ? renderFileTree(fileStructure) : <p>No files found</p>}
        </div>

        
        </div>
        );
};

export default Explorer;
