import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    //@ts-ignore
    const [_, __, removeCookie] = useCookies();

    const logout = () => {
        setAuth("");
        removeCookie("refresh_token");
        navigate("/");
    }

    return { logout };
}