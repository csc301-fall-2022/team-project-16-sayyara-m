import axios from '../api/axios';
import useAuth from './useAuth';
import { useCookies } from 'react-cookie';

// This hook can be used to easily gain a new access token in the event that a request fails
// due to an expired token. Returns a promise that resolves to the new access token string.

// ===== Usage: =====
// import useRefreshToken from '.../hooks/useRefreshToken'
// ...
// const refresh = useRefreshToken();
// ...
// if (--some condition--)
//     refresh?.()

// Note that the authentication context and cookie are set automatically by this function.
// You do not have to set them yourself

function useRefreshToken() {
    const { setAuth } = useAuth();
    const [cookies, setCookie] = useCookies(['refresh_token']);

    const refresh = async (): Promise<string | null> => {
        if (cookies.refresh_token == null) {
            console.log("There is no stored refresh token. User must log in");
            return null;
        }
        const refreshStr: string = 'Bearer ' + cookies.refresh_token;
        const response = await axios.get('/token/refresh', {
            headers: {
                Authorization: refreshStr
            }
        });
        if (response.status === 401) {
            console.log("Refresh token expired. User must log in");
            return null;
        }
        const auth: string = response.data.access_token;
        setAuth(auth);
        setCookie('refresh_token', response.data.refresh_token, {path: '/'});
        console.log('Successfully refreshed');
        return auth;
    }

    return refresh;
}

export default useRefreshToken;