import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";

const ProjectCreator = () => {
    const [projectName, setProjectName] = useState("");
    const [language, setLanguage] = useState("javascript");
    const { user } = useAuth();
    const { setCurrentProject } = useProject();

    const userEmail = user?.email; // Ensure user email exists

    const createProject = async () => {
        if (!projectName.trim()) return alert("Project name is required!");

        try {
            const response = await axios.post("/projects/create", {
                userEmail,
                projectName,
                language
            });

            alert("Project created successfully!");
            setCurrentProject(projectName); // ✅ Update context with new project
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Failed to create project.");
        }
    };

    return (
        <div className="p-4 bg-[#2D2D2D] text-white w-full rounded">
            <h2 className="text-lg mb-2">Create Project</h2>
            <input
                type="text"
                className="w-full p-2 bg-[#1E1E1E] border border-gray-700 rounded text-white"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <select
                className="w-full p-2 mt-2 bg-[#1E1E1E] border border-gray-700 rounded text-white"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
            </select>
            <button
                onClick={createProject}
                className="w-full mt-3 p-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
                Create Project
            </button>
        </div>
    );
};

export default ProjectCreator;
