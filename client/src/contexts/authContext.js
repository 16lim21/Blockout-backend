import { createContext } from "react";

const AuthContext = createContext({
    loggedIn: false,
    setLogin: () => {},
});

export default AuthContext;
