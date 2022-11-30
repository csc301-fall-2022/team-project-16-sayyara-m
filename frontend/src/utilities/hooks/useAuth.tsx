import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// This hook is meant to simplify using the AuthContext in components
// Instead of importing both useContext and AuthContext, simply import this hook

// To gain access to the auth token, see the below example usage:

// import useAuth from '..../useAuth'
// const { useAuth, setAuth } = useAuth();

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;