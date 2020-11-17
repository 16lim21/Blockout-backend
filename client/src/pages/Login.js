/**
 * This is the Login page (first thing that users see if not logged in)
 * @exports Login
 */
import React from "react";
import "./Login.css";
import GoogleButton from "../components/GoogleButton";

const Login = () => {
    return (
        <div className="App">
            <header className="App-header">
                <p>Click button to login!</p>
                <GoogleButton />
            </header>
        </div>
    );
};

export default Login;
