/**
 * Creates the google sign-in button
 * @exports GoogleButton
 * @exports login - This export is temporary, done to allow easier testing
 */
import React from "react";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";

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
const login = (response, setLogin) => {
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

const GoogleButton = ({ loggedIn, setLogin }) => {
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

    const scope = "https://www.googleapis.com/auth/calendar";

    return (
        <div>
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
                    onSuccess={(response) => login(response, setLogin)}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    scope={scope}
                />
            )}
        </div>
    );
};

export { GoogleButton, login };
