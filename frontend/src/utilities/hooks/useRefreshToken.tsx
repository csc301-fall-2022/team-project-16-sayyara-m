import axios from '../api/axios';
import useAuth from './useAuth';
import { useCookies } from 'react-cookie';

// This hook can be used to easily gain a new access token in the event that a request fails
// due to an expired token.

// ===== Usage: =====
// import useAuth from '.../hooks/useAuth'
// import useRefreshToken from '.../hooks/useRefreshToken'
// ...
// const [useAuth, setAuth] = useAuth();
// const refresh = useRefreshToken();
// ...
// // Some request fails due to expired token, handle it by doing this:
// setAuth(refresh());

function useRefreshToken() {
    const { setAuth } = useAuth();
    const [cookies, setCookie] = useCookies(['refresh_token']);

    if (cookies.refresh_token == null) {
        console.log("There is no stored refresh token. User must log in");
        return;
    }

    const refresh = async () => {
        const refreshStr: string = 'Bearer ' + cookies.refresh_token;
        const response = await axios.get('/token/refresh', {
            headers: {
                Authorization: refreshStr
            }
        });
        setAuth(response.data.access_token);
        setCookie('refresh_token', response.data.refresh_token, {path: '/'});
        console.log('Successfully refreshed');
    }
    return refresh;
}

export default useRefreshToken;