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
                            <div className='flex justify-evenly mt-4 mb-8'>
                                <button className="transition duration-100 ease-in-out w-32 bg-white-500 hover:bg-white-700 text-blue
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