/**
 * This is the basic react frontend
 * @exports App
 */
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GoogleButton } from "./googleButton";

const App = () => {
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

export default App;
