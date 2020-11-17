/**
 * This is the Login page (first thing that users see if not logged in)
 * @exports Login
 */
import React, { useState } from "react";
import logo from "./logo.svg";
import "./Login.css";
import { GoogleButton } from "./googleButton";

const Login = () => {
    const [loggedIn, setLogin] = useState(false);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <GoogleButton
                    loggedIn={loggedIn}
                    setLogin={setLogin}
                ></GoogleButton>
            </header>
        </div>
    );
};

export default Login;
