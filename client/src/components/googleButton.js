/**
 * Creates the google sign-in button
 * @exports GoogleButton
 * @exports login - This export is temporary, done to allow easier testing
 */
import React, { useContext } from "react";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const GoogleButton = () => {
    const scope = "https://www.googleapis.com/auth/calendar";
    const { loggedIn, setLogin } = useContext(AuthContext);
    let history = useHistory();

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
        history.push("/");
    };

    /**
     * Config json to be sent with token post request
     * @type {object}
     * @property headers - request headers
     */
    const config = {
        /**
         * Request headers to be sent
         * @property "Content-Type" - The content type of the request
         */
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
    };

    /**
     * Login function that signs user in and sends client token to backend
     * @param {Object} response - The response object received from google login
     */
    const login = (response) => {
        const google_response = response.getAuthResponse();
        const id_token = google_response.id_token;
        const access_token = google_response.access_token;
        const expires_in = google_response.expires_in;
        const data = `id_token=${id_token}&access_token=${access_token}&expires_in=${expires_in}`;

        axios
            .post(process.env.REACT_APP_API_URL + "tokensignin", data, config)
            .then(() => {
                history.push("/home");
                setLogin(true);
            })
            .catch((error) => {
                console.log("Token not sent. Specific error: " + error.message);
            });
    };

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
                    responseType="id_token token"
                    onSuccess={(response) => login(response)}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    scope={scope}
                />
            )}
        </div>
    );
};

export default GoogleButton;
