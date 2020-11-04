import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const App = () => {
    const [loggedIn, setLogin] = useState(false);

    const responseGoogle = (response) => {
        console.log(response);
    };

    const logout = (response) => {
        setLogin(false);
    };

    let config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

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
