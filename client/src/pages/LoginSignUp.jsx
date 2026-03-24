// don't change imports, unless adding new ones, thank you!
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginSignUp.css";
import userIcon from "../assets/person.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import logoIcon from "../assets/Logo.png";
import splashBg from "../assets/Splash.jpg";

const API_BASE = "https://main.dh9rir4igczzc.amplifyapp.com";

const LoginSignUp = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up");
    const [form, setForm] = useState({name: "", email: "", password: ""});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newError = {};

        {/* Checks if a name has been entered and its atleast 2 characters */}
        if (action !== "Login") {
            if (!form.name.trim()) newError.name = "Please, enter your name";
            else if (form.name.length < 2) newError.name = "Your name needs at least 2 characters";
        }

        {/* Checks if an email has been entered and its in the right format */}
        if (!form.email.trim()) newError.email = "Please, enter your email";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) newError.email = "Please, enter a valid email (e.g. name@email.com)";

        {/* Checks if a password has been entered and it meets the requirements */}
        if (!form.password) newError.password = "Please, enter your password";
        else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(form.password))
            newError.password = "Your password needs at least 8 characters, including a letter and a symbol";

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
 
        setLoading(true);
        setError({});
 
        try {
            const endpoint = action === "Sign Up" ? "/api/auth/register" : "/api/auth/login";
            const body = action === "Sign Up"
                ? { name: form.name, email: form.email, password: form.password }
                : { email: form.email, password: form.password };
 
            const response = await fetch(`${API_BASE}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
 
            const data = await response.json();
 
            if (!response.ok) {
                // Show server error under the relevant field or as a general error
                const msg = data.message || "Something went wrong. Please try again.";
                if (msg.toLowerCase().includes("email")) {
                    setError({ email: msg });
                } else if (msg.toLowerCase().includes("password")) {
                    setError({ password: msg });
                } else {
                    setError({ general: msg });
                }
                return;
            }
 
            // Store token and user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
 
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError({ general: "Unable to connect to the server. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const handleSwitch = (type) => {
        if (action !== type) {
            setAction(type);
            setError({});
            return;
        }

        handleSubmit();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        
        <div className="login-page min-h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{backgroundImage: `url(${splashBg})`}}>
            
            {/* SignUp/Login Form */}
            <div className="relative md:w-110 w-85 bg-[#3C5246] rounded-2xl p-10">
                <img src={logoIcon} alt="logo" className="w-30 p-3 mb-6 bg-[#F0ECD1] rounded-full mx-auto" />
 
                <div className="flex flex-col items-center gap-2 mb-6">
                    <div className="text-[#F0ECD1] text-2xl md:text-3xl font-bold">{action}</div>
                </div>
 
                {/* General error (e.g. server down) */}
                {error.general && (
                    <div className="text-[#C54343] text-sm text-center mb-4 bg-red-100 rounded-xl px-3 py-2">
                        {error.general}
                    </div>
                )}
 
                {/* SignUp Section */}
                <div className="grid grid-cols-1 gap-4">
                    {action !== "Login" && (
                        <div>
                            <div className={`flex items-center rounded-2xl px-3 py-2 ${error.name ? "bg-red-100 border border-[#C54343]" : "bg-[#F0ECD1]"}`}>
                                <img src={userIcon} alt="user" className="w-5 mr-3" />
                                <input type="text" name="name" placeholder="Username" value={form.name} onChange={handleChange} className="bg-transparent outline-none w-full text-black" />
                            </div>
 
                            <div className="text-[#C54343] text-xs mt-1"> {error.name} </div>
                        </div>
                    )}
 
                    {/* SignUp/Login Section */}
                    <div>
                        <div className={`flex items-center rounded-2xl px-3 py-2 ${error.email ? "bg-red-100 border border-[#C54343]" : "bg-[#F0ECD1]"}`}>
                            <img src={emailIcon} alt="email" className="w-5 mr-3" />
                            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="bg-transparent outline-none w-full text-black" />
                        </div>
 
                        <div className="text-[#C54343] text-xs mt-1"> {error.email} </div>
                    </div>
 
                    <div>
                        <div className={`flex items-center rounded-2xl px-3 py-2 ${error.password ? "bg-red-100 border border-[#C54343]" : "bg-[#F0ECD1]"}`}>
                            <img src={passwordIcon} alt="password" className="w-5 mr-3" />
                            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="bg-transparent outline-none w-full text-black" />
                        </div>
                        
                       <div className="text-[#C54343] text-xs mt-1"> {error.password} </div>
                    </div>
                </div>
 
                    {/* SignUp/Login Button */}
                    <div className="flex gap-4 mt-10">
                        <div
                            className={`flex-1 text-center py-2 rounded-full cursor-pointer font-bold ${action==="Login"?"bg-gray-300 text-gray-600":"bg-[#5E806D] text-white"} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                            onClick={() => !loading && handleSwitch("Sign Up")}
                        >
                            {loading && action === "Sign Up" ? "Signing up..." : "Sign Up"}
                        </div>
 
                        <div
                            className={`flex-1 text-center py-2 rounded-full cursor-pointer font-bold ${action==="Sign Up"?"bg-gray-300 text-gray-600":"bg-[#5E806D] text-white"} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                            onClick={() => !loading && handleSwitch("Login")}
                        >
                            {loading && action === "Login" ? "Logging in..." : "Login"}
                        </div>
                    </div>
 
                </div>
        </div>
    );
};

export default LoginSignUp;