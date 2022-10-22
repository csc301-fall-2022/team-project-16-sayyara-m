import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from 'src/components/DropDown';

function SignUp() {

    const [signUpUserType, setSignUpUserType] = useState<string>("Vehicle Owner");


    return(
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full my-auto h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    <div className='mx-8'>
                        <div className='flex justify-center my-8'>
                            <label className='text-4xl font-bold'>Sign Up</label>
                        </div>
                        <div className='mb-4 w-full justify-center flex block'>
                            <div className='grid grid-rows-2'>
                                <label className='self-end mb-2 font-bold justify-self-center'>You are a</label>
                                <DropDown onSelectionChanged={setSignUpUserType} items={['Vehicle Owner', 'Shop Owner']} selectedItem={signUpUserType} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 grid-rows-8 gap-1 mt-6 mb-6'>
                            <label className='mb-[2px] font-semibold'>First Name</label>
                            <label className='ml-2 font-semibold'>Last Name</label>
                            <div className='mr-2'>
                                <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                focus:outline-blue-500 focus:shadow-outline" type="text" placeholder=""/>
                            </div>
                            <div className='ml-2'>
                                <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                focus:outline-blue-500 focus:shadow-outline" type="text" placeholder=""/>
                            </div>
                            <label className='col-span-2 mt-1 font-semibold'>
                                Email Address
                            </label>
                            <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Your Email Address"/>
                            <label className='col-span-2 mt-6 font-semibold'>
                                Password
                            </label>
                            <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" type="password" placeholder="************"/>
                            <label className='col-span-2 font-semibold'>
                                Confirm Password
                            </label>
                            <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-blue-500 focus:shadow-outline" type="password" placeholder="************"/>
                        </div>
                        <div className='flex justify-center mb-6'>
                            <button className="transition duration-100 ease-in-out w-[175px] bg-blue-500 hover:bg-blue-700 text-white
                            font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Sign Up
                            </button>
                        </div>
                        <div className='flex w-full justify-center relative mb-4 border-t pt-3 text-sm'>
                            <span className='mr-2 text-gray-500'>Already have an account?</span>
                            <Link to='/'>
                                <a className='transition duration-100 ease-in-out text-blue-500 font-semibold hover:text-blue-800'>Log In</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;