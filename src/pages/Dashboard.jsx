
import { useState } from "react";
import Navbar from "../components/Navbar";  
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";


export default function Dashboard() {
    const [sidebarWidth, setSidebarWidth] = useState(64);

    return (
        <>
            <Navbar/>

            <div className="flex">
                <Sidebar setSidebarWidth={setSidebarWidth} />

                <div
                    style={{ marginLeft: `${sidebarWidth}px` }}
                    className="flex-1 top-14 absolute transition-all duration-200"
                >
                    <CodeEditor/>
                </div>
            </div>
        </>
    );
}
