/**
 * The Single Page Application that incorporates all the routers and the soon to be added navbar
 * @exports App
 */

import React, { useState } from "react";
import Router from "./Router";
import AuthContext from "./contexts/authContext";

function useProvideAuth() {
    const [loggedIn, setLogin] = useState(false);
    return { loggedIn, setLogin };
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

const App = () => {
    return (
        <ProvideAuth>
            <Router />
        </ProvideAuth>
    );
};

export default App;
