import React from "react";
import "./Login.css";

const Finished = (props) => {
    return (
        <div className="login-container">
            <div className="card">
                <h1 className="welcome-message">
                    Hotel Rating is Finished
                </h1>
                <p style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    marginTop: '1rem',
                    opacity: '0.9'
                }}>
                    Thank you for participating in the rating process!
                </p>
            </div>
        </div>
    );
};

export default Finished;