import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useProject } from "../context/ProjectContext";
import { getLanguageFromFile } from "../utils/getLanguage";
import axios from "axios"; // ✅ Import axios

const CodeEditor = () => {
    const { selectedFile } = useProject();
    const language = getLanguageFromFile(selectedFile?.name);
    const [code, setCode] = useState("");

    // ✅ Update code when selectedFile changes
    useEffect(() => {
        if (selectedFile) {
            setCode(selectedFile.content || "");
        }
    }, [selectedFile]);

    // ✅ Correctly handle editor changes
    const handleEditorChange = async (newValue) => {
        setCode(newValue); // ✅ Update state immediately

        if (selectedFile?.path) {
            try {

                await axios.post("/projects/save-file", {
                    filePath: selectedFile.path,
                    content: newValue,
                });
            } catch (error) {
                console.error("Error saving file:", error);
            }
        }
    };

    return (
        <div>
            {/* ✅ Ensure selectedFile is handled properly */}
            <div className="h-10 w-60vw border-r border-b border-[#3C3C3C] flex items-center justify-center">
                <div className="font-mono text-white">
                    {selectedFile?.name || "No file selected"}
                </div>
            </div>
            <Editor
                className="border-r border-[#3C3C3C]"
                height="89vh"
                width="60vw"
                language={language}
                value={code} // ✅ Correctly bind state
                theme="vs-dark"
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditor;
