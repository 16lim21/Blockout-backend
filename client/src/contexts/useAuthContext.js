import { useState } from "react";
import AuthContext from "./AuthContext";

function useProvideAuth() {
    const [loggedIn, setLogin] = useState(false);
    return { loggedIn, setLogin };
}

function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
