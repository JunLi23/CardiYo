// don't change imports, unless adding new ones, thank you!
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/LoginSignUp.css';
import userIcon from '../assets/person.png';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';
import logoIcon from '../assets/Logo.png';

const LoginSignUp = () => {

    const navigate = useNavigate();
    const [action,setAction] = useState("Sign Up");

  return (
    <div className="page">
    <div className="logo">
        <img src={logoIcon} alt="logo" />
    </div>
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>:<div className="input">
                <img src={userIcon} alt="" />
                <input type="text" placeholder='Name' />
            </div>}
            
            <div className="input">
                <img src={emailIcon} alt="" />
                <input type="email" placeholder='Email' />
            </div>
            <div className="input">
                <img src={passwordIcon} alt="" />
                <input type="password" placeholder='Password' />
            </div>
        </div>
        <div className="submit_container">
            <div className={action==="Login"?"submit grey":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit grey":"submit"} 
                onClick={()=>{
                    if(action === "Login"){
                        navigate("/dashboard");
                    } else {
                        setAction("Login");
                    }
                }}
            >
                Login
            </div>
        </div>
    </div>
    </div>

  )
}

export default LoginSignUp
