import { useCookies } from "react-cookie";
import useAuth from "./useAuth";

export const useLogout = () => {
    const { setAuth } = useAuth();
    //@ts-ignore
    const [_, __, removeCookie] = useCookies();

    const logout = () => {
        setAuth("");
        removeCookie("refresh_token");
    }

    return { logout };
}