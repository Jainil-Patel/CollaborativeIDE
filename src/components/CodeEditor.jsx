import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useProject } from "../context/ProjectContext";
import { getLanguageFromFile } from "../utils/getLanguage";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const CodeEditor = () => {
    const { selectedFile } = useProject();
    const language = getLanguageFromFile(selectedFile?.name);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState([]); // ✅ Store execution logs as an array

    useEffect(() => {
        if (selectedFile) {
            setCode(selectedFile.content || "");
        }
    }, [selectedFile]);

    useEffect(() => {
        socket.on("codeUpdate", (newCode) => {
            setCode(newCode);
        });

        socket.on("executionOutput", (data) => {
            setOutput((prev) => [...prev, data]); // ✅ Append new messages
        });

        return () => {
            socket.off("codeUpdate");
            socket.off("executionOutput");
        };
    }, []);

    const handleEditorChange = async (newValue) => {
        setCode(newValue);

        if (selectedFile?.path) {
            try {
                await axios.post("/projects/save-file", {
                    filePath: selectedFile.path,
                    content: newValue,
                });

                socket.emit("codeChange", newValue);
            } catch (error) {
                console.error("Error saving file:", error);
            }
        }
    };

    const handleExecute = () => {
        if (selectedFile?.path) {
            setOutput([{ type: "info", message: "Executing..." }]); // ✅ Reset output before execution
            socket.emit("executeFile", { filePath: selectedFile.path });
        } else {
            setOutput([{ type: "error", message: "Error: No file selected." }]);
        }
    };

    return (
        <div className="flex w-full h-[89vh]">
            {/* Left Side: Code Editor */}
            <div className="flex flex-col w-[60vw] border-r border-[#3C3C3C]">
                <div className="h-10 flex items-center justify-center border-b border-[#3C3C3C]">
                    <div className="font-mono text-white">
                        {selectedFile?.name || "No file selected"}
                    </div>
                </div>
                <Editor
                    className="border-b border-[#3C3C3C]"
                    height="100%"
                    width="100%"
                    language={language}
                    value={code}
                    theme="vs-dark"
                    onChange={handleEditorChange}
                />
            </div>

            {/* Right Side: Execution Output */}
            <div className="w-[23vw] h-full flex flex-col bg-gray-900 text-white p-4">
                <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-t-lg">
                    <span>Execution Output</span>
                    <button
                        className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                        onClick={handleExecute}
                    >
                        Run Code
                    </button>
                </div>
                <div className="h-full bg-black p-4 overflow-auto rounded-b-lg">
                    {output.map((msg, index) => (
                        <pre
                            key={index}
                            className={
                                msg.type === "error"
                                    ? "text-red-500"
                                    : msg.type === "info"
                                    ? "text-gray-400"
                                    : "text-white"
                            }
                        >
                            {msg.message}
                        </pre>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
