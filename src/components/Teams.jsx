import React, { useState } from "react";
import { useTeam } from "../context/TeamContext";
import { useAuth } from "../context/AuthContext";

const Teams = () => {
  const [activeInput, setActiveInput] = useState(null);
  const [teamId, setTeamId] = useState("");
  const [teamPass, setTeamPass] = useState("");

  const { createTeam, joinTeam, fetchTeamInfo, team } = useTeam();
  const { user } = useAuth();

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeam(teamId, teamPass, user.email);
      if (response?.message) alert(response.message);
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Failed to create team.");
    }
    await fetchTeamInfo(teamId);
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await joinTeam(teamId, teamPass, user.email);
      if (response?.message) alert(response.message);
    } catch (error) {
      console.error("Error joining team:", error);
      alert("Failed to join team.");
    }
    await fetchTeamInfo(teamId);
  };

  return (
    <div className="p-4 bg-[#1B1C1D] text-white w-64 h-screen border-r border-[#3C3C3C] flex flex-col">
      {/* Create Team Button */}
      <div
        className="px-4 py-4 rounded bg-[#353536] border-[#3C3C3C] border-2 text-center font-mono hover:bg-[#3C3C3C] select-none cursor-pointer"
        onClick={() => setActiveInput(activeInput === "create" ? null : "create")}
      >
        Create Team
      </div>

      {/* Create Team Form */}
      {activeInput === "create" && (
        <form className="max-w-sm mx-auto mt-4" onSubmit={handleCreateSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-300">Team ID</label>
            <input
              type="text"
              className="w-full p-2.5 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-300">Team Password</label>
            <input
              type="password"
              className="w-full p-2.5 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              value={teamPass}
              onChange={(e) => setTeamPass(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg">
            Submit
          </button>
        </form>
      )}

      {/* Join Team Button */}
      <div
        className="px-4 py-4 rounded bg-[#353536] border-[#3C3C3C] border-2 text-center mt-4 font-mono hover:bg-[#3C3C3C] select-none cursor-pointer"
        onClick={() => setActiveInput(activeInput === "join" ? null : "join")}
      >
        Join Team
      </div>

      {/* Join Team Form */}
      {activeInput === "join" && (
        <form className="max-w-sm mx-auto mt-4" onSubmit={handleJoinSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-300">Team ID</label>
            <input
              type="text"
              className="w-full p-2.5 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-300">Team Password</label>
            <input
              type="password"
              className="w-full p-2.5 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              value={teamPass}
              onChange={(e) => setTeamPass(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg">
            Submit
          </button>
        </form>
      )}

      {/* Display Team Info */}
      {team && (
        <div className="mt-6 p-3 bg-gray-800 rounded">
          <h3 className="text-lg font-bold">Team: {team.teamId}</h3>
          <h4 className="text-sm text-gray-400">Users:</h4>
          <ul>
            {team.users.map((user) => (
              <li key={user._id} className="text-sm">{user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Teams;
