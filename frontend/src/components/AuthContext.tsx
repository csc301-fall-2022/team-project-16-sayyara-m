import React, { SetStateAction } from 'react';
import { createContext, useState } from 'react';

// This custom context stores the access token in a global state
// To access, use the useAuth() hook

interface AuthContextType {
    auth: string,
    setAuth: React.Dispatch<SetStateAction<string>>
}
const AuthContext = createContext<AuthContextType>({
    auth: "",
    setAuth: () => {}
});

interface Props {
    children: React.ReactNode
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState("");

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;