import { useContext ,createContext, useEffect, useState } from "react";
import axios from "../axiosConfig"

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem("token") || null);



useEffect(()=>{
    if(token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common["Authorization"];
    }
}, [token]);


const signup = async (name , email, password) => {
    await axios.post('/auth/signup', {name, email, password})
}

const verifyOtp = async (email, otp) => {
    const res = await axios.post("/auth/verify-otp", { email, otp });
    const receivedToken = res.data.token;
    const receivedUser = res.data.user; // Assume backend sends token after OTP verification
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(receivedUser))
}

const signin = async (email, password) => {
    const res = await axios.post("/auth/signin", { email, password });
    const receivedToken = res.data.token;
    const receivedUser = res.data.user;
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(receivedUser))

  };

const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, verifyOtp, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);