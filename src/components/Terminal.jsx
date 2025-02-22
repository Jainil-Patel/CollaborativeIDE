import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { io } from "socket.io-client";
import { useProject } from "../context/ProjectContext";

const socket = io("http://localhost:5000");

const TerminalComponent = () => {
    const terminalRef = useRef(null);
    const term = useRef(new Terminal({ cursorBlink: true }));
    const fitAddon = useRef(new FitAddon());
    const { selectedFile } = useProject();

    useEffect(() => {
        term.current.loadAddon(fitAddon.current);
        term.current.open(terminalRef.current);
        fitAddon.current.fit();

        socket.on("terminalOutput", (data) => {
            term.current.write(data);
        });

        return () => {
            socket.off("terminalOutput");
        };
    }, []);

    const handleExecute = () => {
        if (selectedFile?.path) {
            term.current.clear();
            term.current.write(`\x1b[32mExecuting: ${selectedFile.name}...\x1b[0m\n`);
            socket.emit("executeFile", { filePath: selectedFile.path });
        } else {
            term.current.write("\x1b[31mError: No file selected.\x1b[0m\n");
        }
    };

    return (
        <div className="flex flex-col w-full p-4 bg-gray-900 rounded-lg shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white rounded-t-lg">
                <span>Terminal</span>
                <button
                    className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                    onClick={handleExecute}
                >
                    Run Code
                </button>
            </div>
            <div className="w-full h-80 bg-black rounded-b-lg">
                <div ref={terminalRef} className="w-full h-full" />
            </div>
        </div>
    );
};

export default TerminalComponent;
