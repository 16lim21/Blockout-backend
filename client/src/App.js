import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const responseGoogle = (response) => {
    console.log(response);
};

const App = () => {
    const [loggedIn, setLogin] = useState(false);
    const [token, setToken] = useState("");

    const logout = (response) => {
        setLogin(false);
        setToken("");
    };

    const login = (response) => {
        setLogin(true);
        setToken(response.accessToken);
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
