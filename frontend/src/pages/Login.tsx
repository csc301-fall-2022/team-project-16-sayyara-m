import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from 'src/components/DropDown';

function Login() {

    const [loginUserType, setLoginUserType] = useState<string>("Vehicle Owner");

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
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" id="email" type="text" placeholder="Email Address"/>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" id="password" type="password" placeholder="********"/>
                            <p className="text-red-500 text-xs italic" hidden={true}>
                                Please choose a password.
                            </p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                <Link to="/home">Log In</Link>
                            </button>
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