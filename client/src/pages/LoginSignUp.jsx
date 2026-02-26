import React from 'react';
import '../styles/LoginSignUp.css';
import userIcon from '../assets/person.png';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';

const LoginSignUp = () => {
  return (
    <div className='container'>
        <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={userIcon} alt="" />
                <input type="text" placeholder='Name' />
            </div>
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
            <div className="forogt_password">Forgot Password? <span>Click Here</span></div>
            <div className="submit">Sign Up</div>
            <div className="submit">Login</div>
        </div>
    </div>
  )
}

export default LoginSignUp
