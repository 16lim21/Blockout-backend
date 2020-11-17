/**
 * The Single Page Application that incorporates all the routers and the soon to be added navbar
 * @exports App
 */

import React from "react";
import Router from "./Router";
import AuthProvider from "./contexts/useAuthContext";

const App = () => {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
};

export default App;
