/**
 * This is the basic react frontend
 * @exports App
 */
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const App = () => {
    const [loggedIn, setLogin] = useState(false);

    /**
     * Debugging function to log response
     * @param {Object} response - the response object received from google login
     */
    const responseGoogle = (response) => {
        console.log(response);
    };

    /**
     * Changes login state to so that front-end renders google login button
     * @param {*} response - the response object received from google login
     */
    const logout = (response) => {
        setLogin(false);
    };

    /**
     * Config json to be sent with token post request
     * @type {object}
     * @property headers - request headers
     */
    let config = {
        /**
         * Request headers to be sent
         * @property "Content-Type" - The content type of the request
         */
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    /**
     * Login function that signs user in and sends client token to backend
     * @param {Object} response - The response object received from google login
     */
    const login = (response) => {
        setLogin(true);
        axios
            .post(
                process.env.REACT_APP_API_URL,
                "idtoken=" + response.getAuthResponse().id_token,
                config
            )
            .then((response) => {
                console.log("Signed in as: " + response.data);
            })
            .catch((error) => {
                console.log("Token not sent. Specific error: " + error.message);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                {loggedIn ? (
                    <GoogleLogout
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                        onFailure={responseGoogle}
                    />
                ) : (
                    <GoogleLogin
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={login}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                    />
                )}
            </header>
        </div>
    );
};

export default App;
