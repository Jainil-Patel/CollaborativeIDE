import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password);
      setStep(2);
    } catch (error) {
      alert("Signup failed. Try again.");
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp(formData.email, formData.otp);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid OTP, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      {/* Animated Background */}
      <motion.div
      className="absolute inset-0"
      animate={{ 
        background: [
          "linear-gradient(45deg, #ff0000, #ff7300)",
          "linear-gradient(45deg, #ff7300, #ffeb00)",
          "linear-gradient(45deg, #ffeb00, #00ff00)",
          "linear-gradient(45deg, #00ff00, #0099ff)",
          "linear-gradient(45deg, #0099ff, #6b00ff)",
          "linear-gradient(45deg, #6b00ff, #ff0000)",
        ]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundSize: "200% 200%",
        filter: "blur(80px)",
        opacity: 0.7,
      }}
    />


      {/* Signup Card */}
      <div className="relative w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 backdrop-blur-md">
        {step === 1 ? (
          <form className="space-y-6" onSubmit={handleSignup}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Create an account
            </h5>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Set Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Re-enter Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="******"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={loading}
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-700 hover:underline dark:text-blue-500"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifyOtp}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Verify OTP
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Enter the 6-digit code sent to your email.
            </p>
            <div>
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                OTP
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
