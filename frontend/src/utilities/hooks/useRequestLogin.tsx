import { API_ROOT } from "src/App";
import { useCookies } from 'react-cookie';
import useAuth from "./useAuth";

// This hook is used to import the requestLogin function, which takes a username and password and attempts to authenticate
// with them. If successful, it will update the access and refresh tokens accordingly.

// requestLogin returns a promise that resolves to a string containing an error message. If the error string is empty, then
// login was successful.

function useRequestLogin() {
    // @ts-ignore
    const [ cookies, setCookie ] = useCookies(['refresh_token']);
    const { setAuth } = useAuth();

    const requestLogin = async (username: string, password: string): Promise<string> => {
        const bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('password', password);
        const requestUrl: string = API_ROOT + '/user/login';
        let errorMsg: string = '';
        await fetch(requestUrl, {
            method: 'POST',
            body: bodyFormData
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    errorMsg = 'Username/password combination not found';
                } else if (response.status >= 400 && response.status < 500) {
                    errorMsg = 'Client failed request, try another device?';
                } else if (response.status >= 500) {
                    errorMsg = 'The server failed to process the request';
                }
                return;
            }
            response.json()
            .then((parsedJson) => {
                const accessToken: string = parsedJson.access_token;
                const refreshToken: string = parsedJson.refresh_token;
                setCookie('refresh_token', refreshToken, {path: '/'});
                setAuth(accessToken);
                console.log('Login succeeded\n');
                console.log('Access token: ' + accessToken + '\n');
                console.log('Refresh token: ' + refreshToken);
            })
            .catch((err) => {
                console.log('Failed to parse JSON');
                console.error(err);
                errorMsg = 'The server\'s response could not be parsed';
            })
        })
        .catch((err) => {
            console.log('Request Failed');
            console.error(err);
            errorMsg = 'Something went wrong making the request';
        });
        return errorMsg;
    }
    return requestLogin;
}

export default useRequestLogin;