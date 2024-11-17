import React from "react";
import "./Login.css";

const Login = (props) => {
    return (
        <div className="login-container">
            <div className="card">
                <h1 className="welcome-message">
                    Welcome to Decentralized Hotel Rating
                </h1>
                <button className="login-button" onClick={props.connectWallet}>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png"
                        alt="MetaMask"
                        className="metamask-icon"
                    />
                    Connect with MetaMask
                </button>
            </div>
        </div>
    );
};

export default Login;