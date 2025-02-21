import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";
import { useTeam } from "../context/TeamContext";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const { user } = useAuth();
    const { setCurrentProject } = useProject();
    const {team} = useTeam();

    let userEmail = user?.email; // Default to logged-in user email

// If team exists and has users, assign the first user's email
    if (team?.users?.length > 0) {
    userEmail = team.users[0].email;
    }


    useEffect(() => {
        const fetchProjects = async () => {
            if (!userEmail) return; // Prevent API call if no user

            try {
                const response = await axios.get("/projects/list", {
                    params: { userEmail }
                });
                setProjects(response.data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [userEmail]); // Re-run if user changes

    return (
        <div className="p-4 bg-[#2D2D2D] text-white w-full rounded">
            <h2 className="text-lg mb-2">Your Projects</h2>
            <ul className="space-y-2">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <li
                            key={project}
                            className="p-2 bg-[#1E1E1E] rounded cursor-pointer hover:bg-[#3C3C3C]"
                            onClick={() => setCurrentProject(project)} // ✅ Update context
                        >
                            {project}
                        </li>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </ul>
        </div>
    );
};

export default ProjectList;
