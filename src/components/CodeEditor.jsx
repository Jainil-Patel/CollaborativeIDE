import React from "react";
import Editor from "@monaco-editor/react";
import { useProject } from "../context/ProjectContext";
import { getLanguageFromFile } from "../utils/getLanguage";
const CodeEditor = () => {

    const {selectedFile} = useProject();
    const language = getLanguageFromFile(selectedFile.name)
    return (
        <div>
            <div className="h-10 w-60vw border-r border-b border-[#3C3C3C] flex items-center justify-center">
                <div className="font-mono text-white">{selectedFile.name || "No file selected"}</div>
            </div>
            <Editor
                className="border-r border-[#3C3C3C]"
                height="89vh"
                width="60vw"
                language={language}
                value={selectedFile.content}
                theme="vs-dark"
            />
    </div>
    );
};

export default CodeEditor;
