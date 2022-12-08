import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import useRequestLogin from 'src/utilities/hooks/useRequestLogin';

// This page displays the login form
function Login() {

    const requestLogin = useRequestLogin();

    // Setting the component's state
    const [loginUsername, setLoginUsername] = useState<string>(""); // Matches whatever is in the username input field
    const [loginPassword, setLoginPassword] = useState<string>(""); // Matches whatever is in the password input field
    const [errorMsg, setErrorMsg] = useState<string>(""); // Error message displayed on failure

    // The onChange input field handlers
    const usernameFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setLoginUsername(newVal);
    }
    const passwordFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setLoginPassword(newVal);
    }

    // Function is called when the login button is clicked.
    const loginClicked = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        requestLogin(loginUsername, loginPassword)
        .then((errorMsg: string) => {
            setErrorMsg(errorMsg);
            if (errorMsg === "") {
                // TODO: Do something on login success

            }
        });
    }

    return(
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8 pt-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    <form className='mx-8' onSubmit={loginClicked}>
                        <div className='flex justify-center my-8'>
                            <label className='text-4xl font-bold'>Owner Login</label>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 font-bold mb-2">
                                Username
                            </label>
                            {/* USERNAME INPUT FIELD */}
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" id="username" type="text"
                            value={loginUsername} onChange={usernameFieldOnChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            {/* PASSWORD INPUT FIELD */}
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" id="password" type="password" placeholder=""
                            value={loginPassword} onChange={passwordFieldOnChange}/>
                            {/* Error message */}
                            <p className="text-red-500 text-xs italic ">
                                {errorMsg}
                            </p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            {/* LOGIN BUTTON */}
                            <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;