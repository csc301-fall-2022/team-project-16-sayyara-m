import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCookies } from 'react-cookie';
import useAuth from 'src/utilities/hooks/useAuth';

import { API_ROOT } from '../App';

function Login() {

    // @ts-ignore
    const [ cookies, setCookie ] = useCookies(['refresh_token']);
    const { setAuth } = useAuth();

    // Setting the component's state
    // const [cookies, setCookie] = useCookies(['auth_token']);
    const [loginUsername, setLoginUsername] = useState<string>(""); // Matches whatever is in the username input field
    const [loginPassword, setLoginPassword] = useState<string>(""); // Matches whatever is in the password input field

    // The onChange input field handlers
    const usernameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setLoginUsername(newVal);
    }
    const passwordFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setLoginPassword(newVal);
    }

    // If event is needed, the type is React.MouseEvent<HTMLButtonElement>
    const loginClicked = (): void => {
        // Function is called when the login button is clicked.

        const bodyFormData = new FormData();
        bodyFormData.append('username', loginUsername);
        bodyFormData.append('password', loginPassword);
        const requestUrl: string = API_ROOT + '/user/login';
        fetch(requestUrl, {
            method: 'POST',
            body: bodyFormData
        })
        .then((response) => {
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
            })
        })
        .catch((err) => {
            console.log('Request Failed');
            console.error(err);
        });
    }

    return(
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8 pt-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    <div className='mx-8'>
                        <div className='flex justify-center my-8'>
                            <label className='text-4xl font-bold'>Owner Login</label>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 font-bold mb-2">
                                Username
                            </label>
                            {/* USERNAME INPUT FIELD */}
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" id="email" type="text"
                            value={loginUsername} onChange={usernameFieldOnChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            {/* PASSWORD INPUT FIELD */}
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" id="password" type="password" placeholder="********"
                            value={loginPassword} onChange={passwordFieldOnChange}/>
                            {/* Error message */}
                            <p className="text-red-500 text-xs italic" hidden={true}>
                                Email/password combination not found
                            </p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            {/* LOGIN BUTTON */}
                            <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                            onClick={loginClicked}>
                                Log In
                            </button>
                            {/* FORGOT PASSWORD LINK */}
                            <button className="transition duration-100 ease-in-out inline-block align-baseline font-bold text-sm
                            text-blue-500 hover:text-blue-800" onClick={() => {}}>
                                Forgot Password?
                            </button>
                        </div>
                        <div className='flex w-full justify-center relative mb-4 border-t pt-3 text-sm'>
                            <span className='mr-2 text-gray-500'>Don't have an account?</span>
                            <Link to='/SignUp'>
                                <a className='transition duration-100 ease-in-out text-blue-500 font-semibold hover:text-blue-800'>Sign Up</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;