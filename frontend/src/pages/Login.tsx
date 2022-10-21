import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [loginUserType, setLoginUserType] = useState<string>("Vehicle Owner");

    const renderDropdown = () => {
        // Renders the dropdown menu depending on the visibility state.

        if (!menuVisible) {
            return (<></>);
        }
        return(
            <div className="absolute right-0 z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
            focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    <a href="#" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-4 py-2 text-sm" role="menuitem"
                    tabIndex={-1} id="menu-item-0"
                    onClick={() => {
                        setLoginUserType("Vehicle Owner");
                        setMenuVisible(false);
                    }}>
                        Vehicle Owner
                    </a>
                    <a href="#" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-4 py-2 text-sm" role="menuitem"
                    tabIndex={-1} id="menu-item-1"
                    onClick={() => {
                        setLoginUserType("Shop Owner");
                        setMenuVisible(false);
                    }}>
                        Shop Owner
                    </a>
                </div>
            </div>
        );
    }

    return(
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='flex w-full justify-center relative'>
                    <div className='absolute bottom-32 text-7xl font-semibold text-blue-800'>
                        Sayyara  {/* We could put a logo here instead */}
                    </div>
                </div>
                <div className='w-full h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    <div className='mx-8'>
                        <div className='flex justify-center my-8'>
                            <span className='text-4xl font-bold'>Log In</span>
                        </div>
                        <div className='mb-4 w-full justify-center flex'>
                            {/* <span className='mr-1 font-bold'>As: </span> */}
                            <div className="relative inline-block text-left">
                                <div>
                                    <button type="button" className="inline-flex w-full justify-center rounded-md border
                                    border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                    id="menu-button" aria-expanded="true" aria-haspopup="true"
                                    onClick={() => { setMenuVisible(!menuVisible) }}>
                                        {loginUserType}
                                        {/* Import - Heroicon name: mini/chevron-down */}
                                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75
                                            0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {renderDropdown()}
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" id="email" type="text" placeholder="Email Address"/>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight
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