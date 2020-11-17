// Help from here: https://usehooks.com/useAuth/
import React, { useState, useContext, createContext } from "react";

const authContext = createContext();

// Provider component that wraps your app and makes auth object
// available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [loggedIn, setLogin] = useState(false);

    const login = (redirect) => {
        setLogin(true);
        redirect();
    };

    const logout = (redirect) => {
        setLogin(false);
        redirect();
    };

    return {
        loggedIn,
        login,
        logout,
    };
}
