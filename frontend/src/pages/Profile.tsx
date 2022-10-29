import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import React, { useState } from "react";

const Profile = () => {

    const [isEditing, setEditing] = useState<boolean>(false)

    return (
        <div className='flex w-screen h-screen justify-center flex-wrap bg-gray-100 px-8 pt-8'>
            <div className='flex flex-wrap h-full max-w-md min-w-[330px] w-full'>
                <div className='w-full h-min border-2 border-gray-300 rounded-lg shadow-lg bg-white'>
                    {!isEditing ?
                        <div className='mx-8'>
                            <div className='flex justify-center my-8'>
                                <AccountCircle fontSize="large" />
                            </div>
                            <div className='flex justify-center my-8'>
                                { /* TODO: Fetch firstName and lastName of user from server */ }
                                <label className='text-3xl font-bold'>firstName lastName</label>
                            </div>
                            <div className='flex justify-center my-8'>
                                { /* TODO: Fetch username of user from server */ }
                                <label className='text-1xl font-bold'>username</label>
                            </div>
                            <div className='flex justify-center mt-8'>
                                <PhoneIcon className="mx-1" />
                                { /* TODO: Fetch phoneNumber of user from server */ }
                                <label className='text-1m mx-1'>123-456-789</label>
                            </div>
                            <div className='flex justify-center mt-4 mb-8'>
                                <EmailIcon className="mx-1" />
                                { /* TODO: Fetch email of user from server */ }
                                <label className='text-1m mx-1'>someone@example.com</label>
                            </div>
                            <div className='flex justify-center mt-4 mb-8'>
                                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setEditing(true)}>
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                        :
                        <div className="mx-8">
                            <div className='grid grid-cols-2 grid-rows-12 gap-1 mt-6 mb-6'>
                                <label className='mb-[2px] font-semibold'>First Name</label>
                                <label className='ml-2 font-semibold'>Last Name</label>
                                <div className='mr-2'>
                                    <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="First Name" defaultValue="firstName"/>
                                </div>
                                <div className='ml-2'>
                                    <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                    focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Last Name" defaultValue="lastName"/>
                                </div>
                                <label className='col-span-2 mt-1 font-semibold'>
                                    Email Address
                                </label>
                                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Email Address" defaultValue="someone@example.com"/>
                                <label className='col-span-2 mt-1 font-semibold'>
                                    Phone Number
                                </label>
                                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Phone Number" defaultValue="123-456-789"/>
                                <label className='col-span-2 mt-1 font-semibold'>
                                    Username
                                </label>
                                <input className="col-span-2 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="Username" defaultValue="username"/>
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
                            <div className='flex justify-evenly my-8'>
                                <button className="transition duration-100 ease-in-out w-32 bg-white hover:bg-gray-100 text-black
                                font-semibold py-2 px-4 rounded border border-black" type="button" onClick={() => setEditing(false)}>
                                    Cancel
                                </button>
                                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setEditing(false)}>
                                    Save
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;