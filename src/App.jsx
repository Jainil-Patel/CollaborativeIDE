import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";

import "./App.css";

function App() {
    const [sidebarWidth, setSidebarWidth] = useState(64);

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar setSidebarWidth={setSidebarWidth} />

                <div
                    style={{ marginLeft: `${sidebarWidth}px` }}
                    className="flex-1 top-14 fixed transition-all duration-200"
                >
                    <CodeEditor />
                </div>
            </div>
        </>
    );
}

export default App;
