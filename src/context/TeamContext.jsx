import { createContext, useContext, useState } from "react";
import axios from "axios";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState(null);

    // Create team
    const createTeam = async (teamId, teamPassword, email) => {
        try {
            const response = await axios.post("/teams/create", { 
                teamId, 
                teamPassword,
                email
            });
            if (response.data.success) {
                await fetchTeamInfo(teamId); // Fetch and update state
            }
            return response.data;
        } catch (error) {
            console.error("Error creating team:", error.response?.data || error.message);
            return error.response?.data || { error: "Error creating team" };
        }
    };

    // Join team
    const joinTeam = async (teamId, teamPassword, email) => {
        try {
            const response = await axios.post("/teams/join", { 
                teamId, 
                teamPassword,
                email
            });
            if (response.data.success) {
                await fetchTeamInfo(teamId); // Fetch and update state
            }
            return response.data;
        } catch (error) {
            console.error("Error joining team:", error.response?.data || error.message);
            return error.response?.data || { error: "Error joining team" };
        }
    };

    // Get team info and update state
    const fetchTeamInfo = async (teamId) => {
        if (!teamId) return { error: "Invalid team ID" };
        try {
            const res = await axios.get(`/teams/getTeam/${teamId}`);
            setTeam(res.data.team); // Store team globally
            return res.data;
        } catch (error) {
            console.error("Error fetching team info:", error);
            return { error: "Failed to fetch team info" };
        }
    };

    return (
        <TeamContext.Provider value={{ team, createTeam, joinTeam, fetchTeamInfo }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => useContext(TeamContext);
