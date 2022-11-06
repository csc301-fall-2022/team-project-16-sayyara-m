import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

import { API_ROOT } from 'src/App';
import DropDown from 'src/components/DropDown';

interface Credentials {
    email: string,
    password: string,
    type: string
}

function Login() {

    // Setting the component's state
    // const [cookies, setCookie] = useCookies(['auth_token']);
    const [loginUserType, setLoginUserType] = useState<string>("Vehicle Owner"); // Can be "Vehicle Owner" or "Shop Owner"
    const [loginEmail, setLoginEmail] = useState<string>(""); // Matches whatever is in the email input field
    const [loginPassword, setLoginPassword] = useState<string>(""); // Matches whatever is in the password input field

    // The onChange input field handlers
    const emailFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setLoginEmail(newVal);
    }
    const passwordFieldOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newVal: string = event.currentTarget.value;
        setLoginPassword(newVal);
    }

    // If event is needed, the type is React.MouseEvent<HTMLButtonElement>
    const loginClicked = (): void => {
        // Function is called when the login button is clicked.
        // Sends a login post request and interprets the response. If successful, sets the auth_token cookie

        const credentials: Credentials = {
            email: loginEmail,
            password: loginPassword,
            type: loginUserType
        };
        const loginRequestUrl: string = API_ROOT + "/login"; // TODO: Change to appropriate endpoint
        console.log("Attempting a login...");
        fetch(loginRequestUrl, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials) 
        })
        .then((response) => {
            if (response.status >= 500) {
                console.log(response.statusText);
                // TODO: Here is where we may want to have the UI display some error since the login failed


            }
            response.json()
            .then((jsonResponse) => {
                // TODO: Set the auth_token cookie with the response


            })
            .catch((e) => {
                console.log("Failed to parse the response as JSON");
                console.error(e);
            });
        })
        .catch((e) => {
            // I believe this function runs when there is a network error, but not an HTTP error response
            console.log("Failed to make the HTTP request");
            console.error(e);
        });
    }

    return(
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8 pt-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    <div className='mx-8'>
                        <div className='flex justify-center my-8'>
                            <label className='text-4xl font-bold'>Log In</label>
                        </div>
                        <div className='mb-4 w-full justify-center flex'>
                            <DropDown onSelectionChanged={setLoginUserType} items={['Vehicle Owner', 'Shop Owner']} selectedItem={loginUserType} />
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            {/* EMAIL INPUT FIELD */}
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" id="email" type="text" placeholder="Email Address"
                            value={loginEmail} onChange={emailFieldOnChange}/>
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
                                <Link to="/home">Log In</Link>
                            </button>
                            {/* FORGOT PASSWORD LINK */}
                            <a className="transition duration-100 ease-in-out inline-block align-baseline font-bold text-sm
                            text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
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