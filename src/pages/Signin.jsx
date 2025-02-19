import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signin(email, password);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-900 overflow-hidden">
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 w-full h-full opacity-60"
                animate={{
                    background: [
                        "linear-gradient(45deg, #ff0000, #ff7300, #ffeb00)",
                        "linear-gradient(45deg, #ff7300, #ffeb00, #00ff00)",
                        "linear-gradient(45deg, #ffeb00, #00ff00, #0099ff)",
                        "linear-gradient(45deg, #00ff00, #0099ff, #6b00ff)",
                        "linear-gradient(45deg, #0099ff, #6b00ff, #ff0000)",
                    ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ filter: "blur(120px)" }}
            />

            {/* Sign-in Card */}
            <div className="relative z-10 w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        Sign in to our platform
                    </h5>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?{" "}
                        <a
                            href="/signup"
                            className="text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Create account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
