import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import React from "react";

const UserInfoPage = (props: { setChangingPassword: (arg0: boolean) => void; setIsViewingShop: (arg0: boolean) => void; setEditingProfile: (arg0: boolean) => void; userInfo: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
} }) => {
    return (
        <div className='mx-8'>
            <ul className="flex justify-evenly -mb-px">
                <li className="mr-2">
                    <a className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500">User</a>
                </li>
                <li>
                    <a className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" onClick={() => props.setIsViewingShop(true)}>Shop</a>
                </li>
            </ul>
            <div className='flex justify-center my-8'>
                <label className='text-3xl font-bold'>{props.userInfo.firstName} {props.userInfo.lastName}</label>
            </div>
            <div className='flex justify-center my-8'>
                <label className='text-1xl font-bold'>{props.userInfo.username}</label>
            </div>
            <div className='flex justify-center mt-8'>
                <PhoneIcon className="mx-1" />
                <label className='text-1m mx-1'>{props.userInfo.phoneNumber}</label>
            </div>
            <div className='flex justify-center mt-4 mb-8'>
                <EmailIcon className="mx-1" />
                <label className='text-1m mx-1'>{props.userInfo.email}</label>
            </div>
            <div className='flex justify-evenly my-8'>
                <button className="transition duration-100 ease-in-out w-34 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.setChangingPassword(true)}>
                    Change Password
                </button>
                <button className="transition duration-100 ease-in-out w-32 bg-blue-500 hover:bg-blue-700 text-white
                font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => props.setEditingProfile(true)}>
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

export default UserInfoPage;